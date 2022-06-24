import { Injectable } from '@angular/core';

import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(item: string, values: User[]): void {
    localStorage.setItem(item, JSON.stringify(values));
  }

  get(item: string): User[] {
    return JSON.parse(localStorage.getItem(item) || '[]');
  }

  removeCurrentUser(): User {
    const currnetUser = JSON.parse(localStorage.getItem('currentUser') || '');
    localStorage.removeItem('currentUser');
    return currnetUser;
  }

  setCurrentUser(currentUser: User): void {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  getCurrentUser(): User | null {
    const currentUser = localStorage.getItem('currentUser');
    if(currentUser)
      return JSON.parse(currentUser);
    return null;
  }
  
}
