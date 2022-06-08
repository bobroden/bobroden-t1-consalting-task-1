import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { AuthorizationModule } from './modules/authorization.module';
import { TasksModule } from './modules/tasks.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from './error/error.component';
import { CreatingTaskComponent } from './creating-task/creating-task.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    CreatingTaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    AuthorizationModule,
    TasksModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }