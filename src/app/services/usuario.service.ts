import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { loginForm } from '../interfaces/login.interface';
import { registerForm } from '../interfaces/registerForm.interface';
import { CargarUsuarios } from '../interfaces/usuario.interface';
import { Usuario } from '../models/usuario.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {





  public usuario: any;
  public urlImagenFirebase: any;
  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone,
    private storage: Storage) {

  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  guardarLocalStorage(token: string, menu: any) {

    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));

  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.ngZone.run(() => {
      this.router.navigateByUrl('/login');

    });

  }
  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/auth/renovarToken`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const { email, nombre, rol, img = '', telefono, uid,estado } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', telefono, img, rol, uid,estado);

        this.guardarLocalStorage(resp.token, resp.menu);

        return true;
      }),
      catchError(error => of(false))
    );

  }
  crearUsuario(formData: registerForm) {

    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
        })
      )

  }
  login(formData: loginForm) {

    return this.http.post(`${base_url}/auth`, formData)
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
        })
      );

  }
  cargarUsuarios(desde: number = 0, limite: number = 5) {

    const url = `${base_url}/usuario/listar/${limite}/${desde}`;
    return this.http.get<CargarUsuarios>(url, this.headers)
      .pipe(
        map(resp => {
          const usuarios = resp.usuarios.map(
            user => new Usuario(user.nombre, user.email, '', user.telefono, user.img, user.rol, user.uid, user.estado)
          );
          return {
            total: resp.total,
            usuarios
          };
        })
      )
  }
  actualizarRol(usuario: Usuario) {
    const url = `${base_url}/usuario/rol/${usuario.uid}`
    return this.http.put(url, usuario, this.headers)

  }
  actualizarEstado(usuario: Usuario) {
    const url = `${base_url}/usuario/estado/${usuario.uid}`
    return this.http.put(url, usuario, this.headers)
  }
  eliminarUsuario(usuario: Usuario) {

    // /usuarios/5eff3c5054f5efec174e9c84
    const url = `${base_url}/usuario/${usuario.uid}`;
    return this.http.delete(url, this.headers);
  }
  guardarUsuario(uid: string, usuario: any) {

    return this.http.put(`${base_url}/usuario/${uid}`, usuario, this.headers);

  }
  actualizarUsuario(usuario: any) {
    const url = `${base_url}/usuario/${usuario.uid}`
    return this.http.put(url, usuario, this.headers)
  }
  cambiarpassword(uid:string,body:any){
     const url = `${base_url}/usuario/actualizarpwd/${uid}`
     return this.http.put(url,body,this.headers)
  }

}
