import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';
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

}
