import { Component, OnInit } from '@angular/core';
import { listarUsuarios, Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  limite = 5
  desde = 0
  usuarios: Usuario[] = []
  usuario: Usuario = {
    nombre: "",
    email: '',
    img: {
      id: ''
    },
    rol: '',
    google: false,
    estado: false,
    uid: '',
  }
  selectOptions:any[]=[
    {
      label:'ADMIN ROL',
      valor:'ADMIN_ROL'
    },
    {
      label:'USER ROL',
      valor:'USER_ROL'
    },
    {
      label:'DEV ROL',
      valor:'DEV_ROL'
    }
  ]
  cabecera: any[] = []
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.listarUsuarios(this.limite, this.desde).subscribe(
      {
        next: (v) => {
          this.usuarios = v.Usuarios
          console.log(this.usuarios)
          for (const keys in this.usuarios[0]) {
            if (keys != 'uid' && keys != 'img') {
              this.cabecera.push(keys)
            }

          }
          console.log(this.cabecera)
        }
      }
    )
  }
  usuarioSeleccionado(usuario: Usuario) {
    this.usuario=usuario
  }

}
