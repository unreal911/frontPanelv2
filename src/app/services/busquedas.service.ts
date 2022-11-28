import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }
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
  busquedaColeccion(coleccion: string, termino: string) {
    const url = `${base_url}/busqueda/${coleccion}/${termino}`
    return this.http.get(url, this.headers)

  }

}
