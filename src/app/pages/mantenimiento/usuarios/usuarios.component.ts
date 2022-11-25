import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';
import { listarUsuarios, Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public totalUsuarios: number = 0
  public usuarios: Usuario[] = []
  public desde: number = 0
  public cargando:boolean=true
  constructor(private authService: AuthService, private fb: FormBuilder) { }


  ngOnInit(): void {

    this.cargarUsuarios()
  }
  cargarUsuarios() {
    this.cargando=true
    this.authService.listarUsuarios(5, this.desde).subscribe({
      next: (v) => {
        this.usuarios = v.Usuarios
        this.totalUsuarios = v.total
        console.log(this.usuarios)
        if (v.Usuarios.length !== 0) {
          this.usuarios = v.Usuarios
        }
        this.cargando=false
      }
    })
  }
  cambiarPagina(valor: number) {
    this.desde += valor
    if (this.desde < 0) {
      this.desde = 0
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor
    }
    this.cargarUsuarios()
  }


}
