import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';
import { CategoryService } from '../../services/category.service';

import { ErrorComponent } from '../error/error.component';

import { MainUserInfo } from '../../interfaces/main-user-info';
import { take } from 'rxjs';

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
    const user: MainUserInfo = {
      login: this.authorizationForm.getRawValue().emailFormControl,
      password: this.authorizationForm.getRawValue().passwordFormControl
    }
    this.userService.getServerUser(user).pipe(take(1)).subscribe((user) => {
      this.userService.setCurrentUser(user);
      this.userService.setIsSigned(true);
      this.taskService.setListOfTasks(this.userService.getCurrentUser().listOfTasks);
      this.categoryService.setListOfCategories(this.userService.getCurrentUser().listOfCategories);
      this.router.navigateByUrl('/tasks');
    })
  }

  signUp(): void {
    const user: MainUserInfo = {
      login: this.authorizationForm.getRawValue().emailFormControl,
      password: this.authorizationForm.getRawValue().passwordFormControl
    }
    this.userService.addUser(user).pipe(take(1)).subscribe((user) => {
      this.userService.setCurrentUser(user);
      this.userService.setIsSigned(true);
      this.categoryService.setListOfCategories([]);
      this.taskService.setListOfTasks([]);
      this.router.navigateByUrl('/tasks');
    })
  }

  changePasswordMode(): void {
    this.hide = !this.hide;
  }

}