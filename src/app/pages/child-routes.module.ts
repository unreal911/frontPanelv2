import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriasComponent } from './mantenimiento/categorias/categorias.component';
import { ProductosComponent } from './mantenimiento/productos/productos.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
const childRoutes:Routes=[
  {path:'',component:DashboardComponent},
  {path:'usuarios',component:UsuariosComponent},
  {path:'categorias',component:CategoriasComponent},
  {path:'productos',component:ProductosComponent}
]

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }