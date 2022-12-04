import { Component, Input, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit {
  public imgTemp: any
  public archivoSub: any
  public imagenes: any[] = []
  @Input() imgTempInput: string = ''
  constructor() { }

  ngOnInit(): void {
    console.log(this.imgTempInput)
  }
  SubirFoto(event: any) {
    console.log(event.target.files[0])
    const archivo = event.target.files[0]
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(archivo);

    reader.onloadend = () => {
      this.imagenes.push({
        archivo: archivo,
        imagenTemporal: reader.result
      })
    };

    console.log(this.imagenes)
  }
  borrarimg(imagen:any,i:number){
   let  nuevoarray =  this.imagenes.splice(i,1)
   console.log(nuevoarray)
  }
  //mostrar cuadros independientes
}
