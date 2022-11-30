import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ListarCategoria } from '../interfaces/listarCategorias.interface';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) {

  }
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
  cargarCategorias(limite:number,desde:number){
      const url = `${base_url}/categoria/listar/${limite}/${desde}`
      return  this.http.get<ListarCategoria>(url,this.headers)
  }
  
}
