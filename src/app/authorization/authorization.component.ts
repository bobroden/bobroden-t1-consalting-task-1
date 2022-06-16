import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { UserService } from '../services/user.service';
import { TaskService } from '../services/task.service';
import { CategoryService } from '../services/category.service';

import { ErrorComponent } from '../error/error.component';

import { MainUserInfo } from '../interfaces/mainUserInfo';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit, OnDestroy {

  emailFormControl: FormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/)]);

  isRegistration: boolean = false;
  hide: boolean = true;

  emailInputValue: string = '';
  passwordInputValue: string = '';

  isValidEmail: boolean = false;
  isValidPassword: boolean = false;

  emailValueSub: Subscription;
  passwordValueSub: Subscription;
  emailStatusSub: Subscription;
  passwodStatusSub: Subscription;

  constructor(private userService: UserService, private taskService: TaskService, private categoryService: CategoryService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.emailValueSub = this.emailFormControl.valueChanges.subscribe(value => this.emailInputValue = value ? value : '');
    this.passwordValueSub = this.passwordFormControl.valueChanges.subscribe(value => this.passwordInputValue = value ? value : '');
    
    this.emailStatusSub = this.emailFormControl.statusChanges.subscribe((status) => {
      if(status === 'VALID')
        this.isValidEmail = true;
      else
        this.isValidEmail = false;
    });
    this.passwodStatusSub = this.passwordFormControl.statusChanges.subscribe((status) => {
      if(status === 'VALID')
        this.isValidPassword = true;
      else
        this.isValidPassword = false;
    })
  }

  ngOnDestroy(): void {
    this.emailValueSub.unsubscribe();
    this.passwordValueSub.unsubscribe();
    this.emailStatusSub.unsubscribe();
    this.passwodStatusSub.unsubscribe();
  }

  openDialog(data: string): void {
    this.dialog.open(ErrorComponent, {
      data: data
    })
  }

  signIn(): void {
    let user: MainUserInfo = {
      login: this.emailInputValue,
      password: this.passwordInputValue
    }
    if(this.userService.isUser(user)) {
      this.userService.isSigned = true;
      this.taskService.listOfTasks = this.userService.currentUser.listOfTasks;
      this.categoryService.listOfCategories = this.userService.currentUser.listOfCategories;
      this.router.navigateByUrl('/tasks');
    }
    else {
      this.openDialog('Sorry, but no such user was found :(');
    }
  }

  signUp(): void {
    let user: MainUserInfo = {
      login: this.emailInputValue,
      password: this.passwordInputValue
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

}