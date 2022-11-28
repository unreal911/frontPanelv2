import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public usuarioLogin:any
  constructor( private usuarioService:UsuarioService) { }

  ngOnInit(): void {
      console.log( this.usuarioService.usuario)
    this.usuarioLogin=this.usuarioService.usuario
  }

}
