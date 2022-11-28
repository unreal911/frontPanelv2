import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo: 'usuarios'|'productos'|'categorias'='usuarios';
  public id: string='';
  public img: string='';

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(
      tipo: 'usuarios'|'categorias'|'productos',
      id: string='',
      img: string = 'no-img'
    ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    // localhost:3000/api/upload/medicos/no-img
      if ( img.includes('https') ) {
        this.img = img;
      } else {
        this.img = `${ base_url }/upload/${ tipo }/${ img }`;
      }
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() { }
}
