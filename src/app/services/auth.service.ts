import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { login } from '../interfaces/login.interface';
import { loginResp } from '../interfaces/loginResp.interface';
import { registerForm } from '../interfaces/registerForm.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { listarUsuarios } from '../interfaces/usuario.interface';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})


export class AuthService {
  public auth2: any;
  public usuario: any;
  constructor(private http: HttpClient) {
    console.log('http')
  }
  get token() {
    return localStorage.getItem('token') || ''
  }
  guardarLocalStorage(token: string) {

    localStorage.setItem('token', token);

  }
  login(usuario: login) {
    const url = `${base_url}/auth`
    return this.http.post<loginResp>(url, usuario)
  }
  crearUsuario(usuario: registerForm) {
    return this.http.post(`${base_url}/usuario`, usuario);
  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/auth/renovarToken`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        console.log(resp)

        return true;
      }),
      catchError(error => of(false))
    );

  }
  listarUsuarios(limite: number, desde: number) {
    return this.http.get<listarUsuarios>(`${base_url}/usuario?limite=${limite}&desde=${desde}`, {
      headers: {
        'x-token': this.token
      }
    })
  }
  actualizarUsuario(usuarioUpdate: Usuario,uid:string) {
    return this.http.put(`${base_url}/usuario/${uid}`, usuarioUpdate, {
      headers: {
        'x-token': this.token
      }
    })
  }
}
