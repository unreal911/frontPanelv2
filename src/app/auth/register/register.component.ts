import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public formSubmit = false
  public registerForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terminos: [true, Validators.required],
  }, {
    Validators: this.passwordsIguales
  })
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }

  crearUsuario() {
    this.formSubmit = true
    console.log(this.registerForm)
    if (this.registerForm.invalid) {
      console.log('el formulario no es valido')
      return;
    }
    if (this.registerForm.valid && this.passValidas() == true) {
      return;
    }
    this.authService.crearUsuario(this.registerForm.value).subscribe((resp) => {
      Swal.fire({
        title: 'Bien!',
        text: 'Se ha creado el usuario exitosamente',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
    }, (err) => {
      console.log(err.error.errors)
      let campo = err.error.errors
      for (const i in campo) {
        console.log(campo[i])
        Swal.fire({
          title: 'Error',
          text: campo[i].msg,
          icon: 'info',
          confirmButtonText: 'Cool'
        })
      }
    })
    console.log(this.registerForm.value)
  }

  aceptarTerminos() {
    if (!this.registerForm.get('terminos')?.value && this.formSubmit) {
      return true
    } else {
      return false
    }
  }
  campovalido(campo: string) {
    if (this.registerForm.get(campo)?.invalid && this.formSubmit == true) {
      return true
    } else {
      return false
    }
  }
  passValidas() {
    const pass1 = this.registerForm.get('password')?.value
    const pass2 = this.registerForm.get('password2')?.value
    if (pass1 != pass2) {
      return true
    } else {
      return false
    }
  }
  passwordsIguales(pass1Name: string, pass2Name: string) {

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null)
      } else {
        pass2Control?.setErrors({ noEsIgual: true })
      }


    }
  }


}
