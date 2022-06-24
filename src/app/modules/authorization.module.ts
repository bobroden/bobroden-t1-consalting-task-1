import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';

import { AuthorizationComponent } from '../authorization/authorization.component';
import { ProfileComponent } from '../profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    AuthorizationComponent,
    ProfileComponent
  ],
  exports: [
    AuthorizationComponent,
    ProfileComponent
  ]
})
export class AuthorizationModule { }