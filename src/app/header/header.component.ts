import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public userService: UserService, private router: Router, private localStorageService: LocalStorageService) { }

  saveChanges(): void {
    this.userService.saveChanges();
  }

  signOut(): void {
    this.userService.isSigned = false;
    this.localStorageService.removeCurrentUser();
    this.router.navigateByUrl('/auth');
  }

}
