import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { CategoriasComponent } from './mantenimiento/categorias/categorias.component';
import { ProductosComponent } from './mantenimiento/productos/productos.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';
import { CrearCategoriaComponent } from './mantenimiento/crear-categoria/crear-categoria.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProductoComponent } from './producto/producto.component';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    DashboardComponent,
    UsuariosComponent,
    CategoriasComponent,
    ProductosComponent,
    PagesComponent,
    PerfilComponent,
    CrearCategoriaComponent,
    ProductoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PipesModule,
    ComponentsModule

  ], exports: [
    DashboardComponent,
    UsuariosComponent,
    CategoriasComponent,
    ProductosComponent,
    PagesComponent,
    PerfilComponent,
    CrearCategoriaComponent,
    ProductoComponent
  ]
})
export class PagesModule { }
