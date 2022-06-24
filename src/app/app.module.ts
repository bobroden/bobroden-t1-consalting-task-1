import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { Routes, RouterModule } from '@angular/router';

import { AuthorizationModule } from './modules/authorization.module';
import { TasksModule } from './modules/tasks.module';
import { CategoryModule } from './modules/category.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from './error/error.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListOfTasksComponent } from './list-of-tasks/list-of-tasks.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { CategoryComponent } from './category/category.component';
import { ProfileComponent } from './profile/profile.component';

import { IsAuthGuard } from './is-auth.guard';

import { TaskInterceptor } from './interceptors/task.interceptor';

const appRoutes: Routes = [
  { path: 'auth', component: AuthorizationComponent },
  { path: 'tasks', component: ListOfTasksComponent, canActivate: [IsAuthGuard] },
  { path: 'categories', component: CategoryComponent, canActivate: [IsAuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [IsAuthGuard] },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    AuthorizationModule,
    TasksModule,
    CategoryModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TaskInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }