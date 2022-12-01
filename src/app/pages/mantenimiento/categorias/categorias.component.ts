import { Component, OnInit } from '@angular/core';
import { ListarCategoria, Result } from 'src/app/interfaces/listarCategorias.interface';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { CategoriaService } from 'src/app/services/categoria.service';
declare var $:any
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
    private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarCategorias()
 

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

}
