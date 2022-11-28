import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public usuario: any;
  public imgTemp: any;
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario
  }
  cambiarImagen(evento: any) {
    const archivo = evento.target.files[0]
    if (!archivo) {
      return this.imgTemp = null
    }
    const reader = new FileReader()
    const url64 = reader.readAsDataURL(archivo)
    reader.onloadend = () => {
      this.imgTemp = reader.result
    }
    return;


  }
  cancelarimg(){
    return this.imgTemp=null
  }
}
