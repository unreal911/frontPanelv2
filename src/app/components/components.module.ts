import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgComponent } from './img/img.component';

// Core SortableJS (without default plugins)



@NgModule({
  declarations: [
    ImgComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    ImgComponent
  ]
})
export class ComponentsModule { }
