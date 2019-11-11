import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './interface_components/home/home.component';
import { NavbarComponent } from './interface_components/navbar/navbar.component';
import { MaterialModule } from './material/material.module';
import { SiteRoutingModule } from './site-routing/site-routing.module';
import { RegisterComponent } from './interface_components/register/register.component';
import { LoginComponent } from './interface_components/login/login.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    SiteRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
