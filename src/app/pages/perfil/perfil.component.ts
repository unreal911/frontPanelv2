import { Component, OnInit } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytes,
  list,
  listAll,
  getDownloadURL,
} from '@angular/fire/storage';
import { SubirImagenService } from 'src/app/services/subir-imagen.service';

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  public usuario: any;
  public imgTemp: any;
  public archivoSubir: any;
  public urlImagenFirebase: any;
  constructor(
    private usuarioService: UsuarioService,
    private storage: Storage,
    private subirImagenService: SubirImagenService
  ) {}

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
    this.recuperarImagen();
  }
  cambiarImagen(evento: any) {
    const archivo = evento.target.files[0];
    this.archivoSubir = evento.target.files[0];
    if (!archivo) {
      this.archivoSubir = null;
      return (this.imgTemp = null);
    }
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
    return;
  }
  cancelarimg() {
    this.archivoSubir = null;
    return (this.imgTemp = null);
  }
  subirimg() {
    console.log(this.archivoSubir);
    const imgRef = ref(this.storage, `images/${this.archivoSubir.name}`);
    uploadBytes(imgRef, this.archivoSubir)
      .then((resp) => {
        console.log(resp);
        getDownloadURL(imgRef).then((resp) => {
          this.urlImagenFirebase = resp;
          let data = {
            uid: this.usuario.uid,
            url: this.urlImagenFirebase,
          };
          console.log(data);
          this.subirImagenService
            .subirImagen('usuarios', data)
            .subscribe((resp) => {
              console.log(resp);
            });
          console.log(resp);
        });
      })
      .catch((error) => console.log(error));
  }
  recuperarImagen() {

    
  }
}
