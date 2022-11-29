import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const url_base = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class SubirImagenService {

  constructor(private http: HttpClient) { }
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }
  subirImagen(coleccion: string, data: any) {
    const url = `${url_base}/subirimagen/${coleccion}/${data.uid}`
    return this.http.post(url, data, this.headers)
  }
}
