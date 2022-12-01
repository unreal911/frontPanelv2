import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenFirebasePipe } from './imagen-firebase.pipe';



@NgModule({
  declarations: [
    ImagenFirebasePipe
  ],
  exports:[
    ImagenFirebasePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
