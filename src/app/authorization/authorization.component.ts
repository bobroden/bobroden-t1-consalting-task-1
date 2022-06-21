import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { UserService } from '../services/user.service';
import { TaskService } from '../services/task.service';
import { CategoryService } from '../services/category.service';

import { ErrorComponent } from '../error/error.component';

import { MainUserInfo } from '../interfaces/main-user-info';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent {

  authorizationForm: FormGroup = new FormGroup({
    emailFormControl: new FormControl(null, [Validators.required, Validators.email]),
    passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/)])
  });

  isRegistration: boolean = false;
  hide: boolean = true;

  constructor(private userService: UserService, private taskService: TaskService, private categoryService: CategoryService, public dialog: MatDialog, private router: Router) { }

  openDialog(data: string): void {
    this.dialog.open(ErrorComponent, {
      data: data
    })
  }

  signIn(): void {
    let user: MainUserInfo = {
      login: this.authorizationForm.getRawValue().emailFormControl,
      password: this.authorizationForm.getRawValue().passwordFormControl
    }
    if(this.userService.isUser(user)) {
      this.userService.isSigned = true;
      this.taskService.listOfTasks = this.userService.currentUser.listOfTasks;
      this.categoryService.listOfCategories = this.userService.currentUser.listOfCategories;
      this.router.navigateByUrl('/tasks');
    }
    else {
      this.openDialog('Incorrect login or password! :(');
    }
  }

  signUp(): void {
    let user: MainUserInfo = {
      login: this.authorizationForm.getRawValue().emailFormControl,
      password: this.authorizationForm.getRawValue().passwordFormControl
    }
    if(!this.userService.checkSameLogin(user)) {
      this.userService.addUser(user);
      this.categoryService.listOfCategories = [];
      this.taskService.listOfTasks = [];
      this.router.navigateByUrl('/tasks');
    }
    else {
      this.openDialog('Sorry, but we already have such a user :(');
    }
  }

  changePasswordMode(): void {
    this.hide = !this.hide;
  }

}