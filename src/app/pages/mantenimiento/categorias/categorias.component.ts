import { Component, OnInit } from '@angular/core';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { ListarCategoria, Result } from 'src/app/interfaces/listarCategorias.interface';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';
declare var $: any
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  public desde: number = 0;
  public totalCategorias: number = 0
  public categorias: Result[] = []
  public categoriasTemp: any;
  public cargando: boolean = true
  constructor(private categoriaService: CategoriaService,
    private busquedaService: BusquedasService,
    private storage: Storage) { }

  ngOnInit(): void {
    this.cargarCategorias()
    $('.img-circle').attr('href', '')
    this.recuperarImagen()
  }
  cambiarEstado(estado: any, uid: string) {
    console.log(estado)
    console.log(uid)
    this.categoriaService.actualizarCategoriaCampo(uid, { estado: estado }).subscribe(
      (resp) => {
        Swal.fire('Exito!!!', 'se actualizo el estado', 'success')
      }, (err) => {
        console.log(err)
      }
    )
    //recibe el estado bien
  }
  guardarNombre(nombre: any, uid: string) {
    console.log(nombre)
    console.log(uid)
    this.categoriaService.actualizarCategoriaCampo(uid, { nombre: nombre }).subscribe(
      (resp) => {
        Swal.fire('Exito!!!', 'se actualizo el nombre', 'success')
      }, (err) => {
        Swal.fire('Cuidado!!!', err.error.errors[0].msg, 'warning')
      }
    )
    //recibo el valor que se dice
  }
  cargarCategorias() {
    this.categoriaService.cargarCategorias(this.desde, 5).subscribe((resp) => {

      this.totalCategorias = resp.total
      this.categorias = resp.results

      this.categoriasTemp = resp.results
      this.cargando = false
      console.log(this.categorias)
    })
  }
  buscar(termino: string) {
    if (termino.length == 0) {
      this.categorias = this.categoriasTemp
      return;
    }
    this.busquedaService.busquedaColeccion('categorias', termino).subscribe(
      (resp: any) => {
        console.log(resp)
        this.categorias = resp.results
      }
    )
  }
  cambiarPagina(valor: number) {
    this.desde += valor;
    console.log(this.desde)
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalCategorias) {
      this.desde -= valor;
    }
    this.cargarCategorias();
  }
  recuperarImagen() {
    console.log('estas en el recuperar imagen')
    for (let i = 0; i < this.categorias.length; i++) {
      const element = this.categorias[i];
      console.log(element)
    }
  }
  eliminarCategoria(uid:string){
      this.categoriaService.eliminarCategoria(uid).subscribe(
        (resp)=>{
          this.cargarCategorias()
        }
      )
  }


}
