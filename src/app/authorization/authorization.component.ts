import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserService } from '../services/user.service';

import { User } from '../interfaces/user';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit, OnDestroy {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/)])

  isRegistration = false;
  hide = true;

  emailInputValue = '';
  passwordInputValue = '';

  isValidEmail = false;
  isValidPassword = false;

  emailValueSub: Subscription;
  passwordValueSub: Subscription;
  emailStatusSub: Subscription;
  passwodStatusSub: Subscription;

  constructor(private userService: UserService) { }

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

  changeMode(): void {

  }

  signIn(): void {
    let user: User = {
      login: this.emailInputValue,
      password: this.passwordInputValue
    }
    if(this.userService.isUser(user)) {
      this.userService.isSigned = true;
    }
  }

  signUp(): void {
    let user: User = {
      login: this.emailInputValue,
      password: this.passwordInputValue
    }
    this.userService.addUser(user);
  }

}