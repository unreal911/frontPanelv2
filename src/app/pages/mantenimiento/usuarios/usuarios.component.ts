import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';

import { AuthService } from 'src/app/services/auth.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public permisos:boolean=false;
  constructor(private usuarioService: UsuarioService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService,
  ) {

  }
  ngOnInit(): void {
    this.cargarUsuarios();

  }
  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde, 5)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
        console.log(this.usuarios)
      }, (err) => {
        console.log(err)
        this.permisos=true
      })
  }
  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }
  buscar(termino: string) {
    if (termino.length === 0) {
      return;
    }
    if (termino.length === 0) {
      this.usuarios = this.usuariosTemp;
    }
    this.busquedasService.busquedaColeccion('usuarios', termino)
      .subscribe((resp: any) => {
        this.usuarios = resp.results;
      });
  }
  cambiarRol(usuario: Usuario) {
    console.log(usuario)
    this.usuarioService.actualizarRol(usuario).subscribe((resp) => {
      console.log(resp)
    })
  }
  cambiarEstado(usuario: Usuario) {
    this.usuarioService.actualizarEstado(usuario).subscribe((resp) => {
      console.log(resp)
    })
  }
}











