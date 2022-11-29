import { Component, OnInit } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public urlImagenFirebase: any =
    'https://media.tenor.com/XK37GfbV0g8AAAAC/loading-cargando.gif';
  public perfilForm: any; //ver este error al formgroup
  public passwordForm: any;
  public campoValidopwd: boolean = false;
  public formularioPosteado: boolean = false;
  constructor(
    private usuarioService: UsuarioService,
    private storage: Storage,
    private subirImagenService: SubirImagenService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
    this.recuperarImagen();
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre],
      email: [this.usuario.email],
      telefono: [this.usuario.telefono],
    });
    this.passwordForm = this.fb.group({
      passwordOld: ['', Validators.required],
      passwordNew: ['', Validators.required],
      RePasswordNew: ['', Validators.required],
    });
  }
  cuardarCambios() {
    console.log(this.perfilForm.valid);
    if (this.perfilForm.value.email == this.usuario.email) {
      delete this.perfilForm.value.email;
    }
    console.log(this.perfilForm.value);
    this.usuarioService
      .guardarUsuario(this.usuario.uid, this.perfilForm.value)
      .subscribe(
        (resp) => {
          console.log(resp);
          Swal.fire('Exito!!!', 'Cambios guardados correctamente', 'success');
        },
        (err) => {
          console.log(err);
          Swal.fire('Cuidado!!', err.error.errors[0].msg, 'error');
        }
      );
    //hacer validaciones con el swalfire
  }
  campovalido() {
    if (
      this.passwordForm.get('passwordNew').value !=
        this.passwordForm.get('RePasswordNew').value &&
      this.formularioPosteado == true
    ) {
      this.passwordForm.get('RePasswordNew').setErrors({ noEsIgual: true });
      //  console.log(this.passwordForm)
      return true;
    } else {
      this.passwordForm.get('RePasswordNew').setErrors();
      return false;
    }
  }

  cambiarpassword() {
    this.formularioPosteado = true;
    // console.log(this.passwordForm.value);
    console.log(this.passwordForm.valid);
    if (this.passwordForm.valid == false) {
      console.log('Formulario no posteado');
      return;
    } else if (this.campovalido() == true ) {
      return;
    } else {
      console.log(this.passwordForm.value);
      this.usuarioService
        .cambiarpassword(this.usuario.uid, this.passwordForm.value)
        .subscribe((resp:any) => {
          Swal.fire('Exito1!!','Contraseña actualizada con exito','success')
          //falta cerrar el modal con jquery
        },(err:any)=>{
          Swal.fire('Cuidado!!!',err.error.msg,'error')
        });
      console.log('Formulario posteado');
    }
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

  async subirimg() {
    console.log(this.archivoSubir);
    if (this.archivoSubir == undefined) {
      Swal.fire('Cuidaddo!!!', 'Aun no seleccionaste nada', 'info');
      return;
    }

    const imgRef = ref(this.storage, `images/${this.archivoSubir.name}`);

    console.log(this.usuario);
    const deleteref = ref(this.storage, this.usuario.img.url);
    await deleteObject(deleteref)
      .then((resp) => console.log('se elimino los archivos'))
      .catch((err) => console.log(err));

    await uploadBytes(imgRef, this.archivoSubir)
      .then((resp) => {
        let data = {
          uid: this.usuario.uid,
          url: resp.metadata.fullPath,
        };

        this.subirImagenService
          .subirImagen('usuarios', data)
          .subscribe((resp) => {});
        Swal.fire('Exito!!', 'Imagen subida correctamente', 'success');
      })
      .catch((error) => console.log(error));
  }
  recuperarImagen() {
    getDownloadURL(ref(this.storage, this.usuario.img.url))
      .then((resp) => {
        this.urlImagenFirebase = resp;
      })
      .catch((errr) => console.log(errr));
  }
}
