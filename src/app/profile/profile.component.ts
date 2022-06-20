import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { UserService } from '../services/user.service';

import { ErrorComponent } from '../error/error.component';

import { MainUserInfo } from '../interfaces/main-user-info';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup = new FormGroup({
    emailFormControl: new FormControl(this.userService.currentUser.login, [Validators.required, Validators.email]),
    passwordFormControl: new FormControl(this.userService.currentUser.password, [Validators.required, Validators.minLength(5), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/)])
  })

  isRegistration: boolean = false;
  hide: boolean = true;

  isValidEmail: boolean = true;
  isValidPassword: boolean = true;

  constructor(private userService: UserService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  openDialog(data: string): void {
    this.dialog.open(ErrorComponent, {
      data: data
    })
  }

  change(): void {
    let user: MainUserInfo = {
      login: this.profileForm.getRawValue().emailFormControl,
      password: this.profileForm.getRawValue().passwordFormControl
    }
    if(!this.userService.checkSameLogin(user)) {
      this.userService.changeUserInfo(user);
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
