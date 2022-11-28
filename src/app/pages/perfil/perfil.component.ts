import { Component, OnInit } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytes,
  list,
  listAll,
  getDownloadURL,
  deleteObject,
} from '@angular/fire/storage';
import { SubirImagenService } from 'src/app/services/subir-imagen.service';

import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  public usuario: any;
  public imgTemp: any;
  public archivoSubir: any;
  public urlImagenFirebase: any = 'https://avatars.akamai.steamstatic.com/46deb9d28238b87fc02ad664c413a4383e992615_full.jpg';

  constructor(
    private usuarioService: UsuarioService,
    private storage: Storage,
    private subirImagenService: SubirImagenService
  ) { }

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
    if (this.archivoSubir == undefined) {
      Swal.fire('Cuidaddo!!!', 'Aun no seleccionaste nada', 'info')
      return;
    }

    const imgRef = ref(this.storage, `images/${this.archivoSubir.name}`);
    uploadBytes(imgRef, this.archivoSubir)
      .then((resp) => {
        let data = {
          uid: this.usuario.uid,
          url: resp.metadata.fullPath,
        };
        const deleteref = ref(this.storage, this.usuario.img.url)
        deleteObject(deleteref).then(
          resp => console.log('se elimino los archivos')
        ).catch(err => console.log(err))
        this.subirImagenService
          .subirImagen('usuarios', data)
          .subscribe((resp) => {
          });
        Swal.fire('Exito!!', 'Imagen subida correctamente', 'success')
      })
      .catch((error) => console.log(error));
  }
  recuperarImagen() {

    getDownloadURL(ref(this.storage, this.usuario.img.url)).then(
      (resp) => {
        this.urlImagenFirebase = resp
      }
    ).catch(errr => console.log(errr))
  }

}
