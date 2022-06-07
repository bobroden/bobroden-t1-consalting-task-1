import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(item: string, values: []): void {
    localStorage.setItem(item, JSON.stringify(values));
  }

  get(item: string) {
    return JSON.parse(localStorage.getItem(item) || '[]');
  }
  
}
