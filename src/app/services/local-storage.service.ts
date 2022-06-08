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
  
}
