import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NofoundComponent } from './nofound/nofound.component';



@NgModule({
  declarations: [
    AppComponent,
    NofoundComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule,
    AuthModule,
    AppRoutingModule

   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
