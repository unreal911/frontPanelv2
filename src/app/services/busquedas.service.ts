import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor() { }
  get token() {
    return localStorage.getItem('token') || ''
  }
  busquedaColeccion(){
  const url=''
  
  }

}
