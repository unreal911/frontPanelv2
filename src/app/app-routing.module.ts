import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { NofoundComponent } from './nofound/nofound.component';
import { PagesRoutingModule } from './pages/pages.routing';


const routes: Routes = [
  {path:'',redirectTo:'/dashboard',pathMatch:'full'},
  { path: '**', component: NofoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    PagesRoutingModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
