import { Injectable } from '@angular/core';

import { AboutUser } from '../interfaces/about-user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(item: string, values: AboutUser[]): void {
    localStorage.setItem(item, JSON.stringify(values));
  }

  get(item: string) {
    return JSON.parse(localStorage.getItem(item) || '[]');
  }
  
}
