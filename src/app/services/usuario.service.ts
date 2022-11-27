import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
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

  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {

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
        const { email, nombre, rol, img = '', uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img, rol, uid);

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
  cargarUsuarios(desde: number = 0) {

    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuarios>(url, this.headers)
      .pipe(
        map(resp => {
          const usuarios = resp.usuarios.map(
            user => new Usuario(user.nombre, user.email, '', user.img, user.rol, user.uid)
          );
          return {
            total: resp.total,
            usuarios
          };
        })
      )
  }
  eliminarUsuario(usuario: Usuario) {

    // /usuarios/5eff3c5054f5efec174e9c84
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);
  }
  guardarUsuario(usuario: Usuario) {

    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);

  }

}
