import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css'],
})
export class CrearCategoriaComponent implements OnInit {
  public imgTemp: any;
  public categoriaForm: any;
  public archivo: any;
  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.categoriaForm = this.fb.group({
      nombre: [''],
      estado: [true],
    });
  }
  subirFoto(event: any) {
    console.log(event.target.files[0]);
    this.archivo = event.target.files[0];
    if (!this.archivo) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.archivo);
    reader.onloadend = () => {
      console.log(reader.result);
      this.imgTemp = reader.result;
    };
  }
  limpiar() {
    (this.imgTemp = null), (this.archivo = null);
  }
  guardarCategoria() {
    console.log(this.categoriaForm.value); //falta probar
    if (!this.archivo) {
      Swal.fire('Cuidado!!!', 'No seleccionaste una imagen', 'warning');
      return;
    }
    this.categoriaService
      .guardarCategoria(this.categoriaForm.value, this.archivo)
      .subscribe(
        (resp) => {
          console.log(resp);
          (this.imgTemp = null), (this.archivo = null);
          this.categoriaForm.setValue({
            nombre: '',
            estado: true,
          });
          Swal.fire('Exito!!!', 'Se creo la categoria', 'success');
        },
        (err) => {
          Swal.fire('Cuidado', err.error.errors[0].msg, 'warning');
        }
      );
  }
}
