import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListarCategoria } from '../interfaces/listarCategorias.interface';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient,
    private storage: Storage) {

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
  cargarCategorias(desde: number = 0, limite: number = 5) {
    const url = `${base_url}/categoria/listar/${limite}/${desde}`
    console.log(url)
    return this.http.get<ListarCategoria>(url, this.headers)
  }
  guardarCategoria(body: any, file: File) {
    const url = `${base_url}/categoria`
    return this.http.post(url, body, this.headers).pipe(
      tap(
        (resp: any) => {
          this.guardarImagen('categorias', file, resp.result.uid)
        }
      )
    )
  }
  guardarImagen(coleccion: string, file: File, uid: string) {
    const path = `images/${coleccion}/${coleccion}${uid}`
    const imgRef = ref(this.storage, path)
    uploadBytes(imgRef, file).then(
      (resp) => {
        console.log(resp)
        let data = {
          img: {
            url: resp.metadata.fullPath
          }
        }
        this.actualizarCategoria(uid, data)
      }
    ).catch(
      (err) => {
        console.log(err)
      }
    )
  }
  actualizarCategoria(id: string, body: any) {
    const url = `${base_url}/categoria/${id}`
    return this.http.put(url, body, this.headers).subscribe(
      (resp) => {
        console.log(resp)
      },
      (err) => {
        console.log(err)
      }

    )
  }
  actualizarCategoriaCampo(id: string, body: any) {
    const url = `${base_url}/categoria/${id}`
    return this.http.put(url, body, this.headers)
  }
  eliminarCategoria(uid: string) {
    const url = `${base_url}/categoria/${uid}`
    return this.http.delete(url, this.headers)

  }

}
