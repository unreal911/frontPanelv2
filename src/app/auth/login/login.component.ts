import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { loginResp } from 'src/app/interfaces/loginResp.interface';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public posteado: boolean = false
  public loginForm: FormGroup = this.fb.group({
    email: [localStorage.getItem('email') || '', Validators.required],
    password: ['', Validators.required],
    recordar: true
  })
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router) {

  }

  ngOnInit(): void {

  }
  campoValido(campo: string) {
    if (this.loginForm.get(campo)?.invalid && this.posteado) {
      return true
    } else {
      return false
    }
  }
  //routerLink="/dashboard"
  login() {
    this.posteado = true
    if (this.loginForm.invalid) {
      console.log(this.loginForm.invalid)
      return;
    }
    console.log(this.loginForm)
    this.authService.login(this.loginForm.value).subscribe(/*(resp: any) => {
      console.log(resp)
      this.router.navigateByUrl('dashboard')
      localStorage.setItem('token', resp.token)
    }, (err) => {
      console.log(err)
    }
*/
      {
        next: (v: loginResp) => {
          this.router.navigateByUrl('dashboard')
          localStorage.setItem('token', v.token)
          if (this.loginForm.get('recordar')?.value) {
            localStorage.setItem('email', this.loginForm.get('email')?.value)

          }else[
            localStorage.removeItem('email')
          ]
        },
        error: (e: any) => {

          let camposErr = e.error.errors;
          let arrayErr = [];
          if (e.error.errors) {
            for (const i in camposErr) {
              console.log(camposErr[i]);
              arrayErr.push(camposErr[i].msg);
            }
            console.log(arrayErr);
            Swal.fire({
              title: 'Error',
              text: `${arrayErr}`,
              icon: 'info',
              confirmButtonText: 'Cool',
            });
          } else {
            console.log(e.error.msg);
            Swal.fire({
              title: 'Error',
              text: `${e.error.msg}`,
              icon: 'info',
              confirmButtonText: 'Cool',
            });
          }
        }
      }


    )

  }


}
