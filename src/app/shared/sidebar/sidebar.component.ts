import { Component, OnInit } from '@angular/core';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public usuarioLogin: any
  public imagenFirebase:any
  constructor(private usuarioService: UsuarioService, private storage: Storage) { }

  ngOnInit(): void {

    this.usuarioLogin = this.usuarioService.usuario
    console.log(this.usuarioLogin)
    this.recuperarImagen();
  }
  recuperarImagen() {

    getDownloadURL(ref(this.storage, this.usuarioLogin.img.url)).then(
      (resp) => {
        console.log(resp)
        this.imagenFirebase=resp
      }
    ).catch(errr => console.log(errr))
  }
}
