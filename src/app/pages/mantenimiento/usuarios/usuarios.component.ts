import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private usuarioServices: UsuarioService) {

  }
  ngOnInit(): void {
    this.usuarioServices.cargarUsuarios().subscribe((resp) => {
      console.log(resp)
    })

  }

}
