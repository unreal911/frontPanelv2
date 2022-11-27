import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

import { loginResp } from '../interfaces/loginResp.interface';
import { registerForm } from '../interfaces/registerForm.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})


export class AuthService {
  public auth2: any;
  public usuarioAuth: any;
  constructor(private http: HttpClient) {
    console.log('http')
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }
  get token() {
    return localStorage.getItem('token') || ''
  }
  guardarLocalStorage(token: string) {

    localStorage.setItem('token', token);

  }
  login(usuario: any) {
    const url = `${base_url}/auth`
    return this.http.post<loginResp>(url, usuario).pipe(
      tap(
        resp => {
          this.guardarLocalStorage(resp.token)
        }
      )
    )
  }
  crearUsuario(usuario: registerForm) {
    return this.http.post(`${base_url}/usuario`, usuario);
  }
  eliminarUsuario(id: string) {
    const url = `${base_url}/usuario/${id}`
    return this.http.delete(url, this.headers)
  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/auth/renovarToken`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {

        this.usuarioAuth = resp.usuario
        console.log(this.usuarioAuth)
        console.log(resp)
        return true;
      }),
      catchError(error => of(false))
    );

  }
  listarUsuarios(limite: number, desde: number) {
    return this.http.get(`${base_url}/usuario?limite=${limite}&desde=${desde}`, {
      headers: {
        'x-token': this.token
      }
    })
  }
  actualizarUsuario(usuarioUpdate: Usuario, uid: string) {
    return this.http.put(`${base_url}/usuario/${uid}`, usuarioUpdate, {
      headers: {
        'x-token': this.token
      }
    })
  }
}
