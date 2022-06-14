import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  saveChanges(): void {
    this.userService.saveChanges();
  }

  signOut(): void {
    this.userService.isSigned = false;
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/auth');
  }

}
