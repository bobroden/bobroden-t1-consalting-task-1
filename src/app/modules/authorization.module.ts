import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

import { AuthorizationComponent } from '../components/authorization/authorization.component';
import { ProfileComponent } from '../components/profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
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