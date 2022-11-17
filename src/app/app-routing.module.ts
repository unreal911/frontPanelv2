import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { NofoundComponent } from './nofound/nofound.component';


const routes: Routes = [
  { path: '**', component: NofoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
