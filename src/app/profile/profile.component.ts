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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  emailFormControl: FormControl = new FormControl(this.userService.currentUser.login, [Validators.required, Validators.email]);
  passwordFormControl: FormControl = new FormControl(this.userService.currentUser.password, [Validators.required, Validators.minLength(5), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/)]);

  isRegistration: boolean = false;
  hide: boolean = true;

  emailInputValue: string = '';
  passwordInputValue: string = '';

  isValidEmail: boolean = true;
  isValidPassword: boolean = true;

  emailValueSub: Subscription;
  passwordValueSub: Subscription;
  emailStatusSub: Subscription;
  passwodStatusSub: Subscription;

  constructor(private userService: UserService, public dialog: MatDialog, private router: Router) { }

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

  change(): void {
    let user: MainUserInfo = {
      login: this.emailInputValue,
      password: this.passwordInputValue
    }
    console.log(user);
    if(!this.userService.checkSameLogin(user)) {
      this.userService.changeUserInfo(user);
      this.router.navigateByUrl('/tasks');
    }
    else {
      this.openDialog('Sorry, but we already have such a user :(');
    }
  }

}
