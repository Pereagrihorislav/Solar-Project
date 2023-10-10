import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthPageRoutingModule } from './auth-page-routing.module';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    AuthPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthPageModule { }