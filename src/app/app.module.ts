import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NofoundComponent } from './nofound/nofound.component';
import { PagesModule } from './pages/pages.module';



@NgModule({
  declarations: [
    AppComponent,
    NofoundComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule,
    AuthModule,
    AppRoutingModule,
    PagesModule,
  

   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
