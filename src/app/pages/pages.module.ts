import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { CategoriasComponent } from './mantenimiento/categorias/categorias.component';
import { ProductosComponent } from './mantenimiento/productos/productos.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DashboardComponent,
    UsuariosComponent,
    CategoriasComponent,
    ProductosComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ], exports: [
    DashboardComponent,
    UsuariosComponent,
    CategoriasComponent,
    ProductosComponent,
    PagesComponent
  ]
})
export class PagesModule { }
