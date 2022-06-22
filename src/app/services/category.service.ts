import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  listOfCategories$ = new BehaviorSubject<string[]>([]);

  constructor() { }

  setListOfCategories(list: string[]): void {
    this.listOfCategories$.next(list);
  }

  add(category: string, listOfCategories: string[]): void {
    const index = listOfCategories.findIndex(item => item === category);
    if(index === -1) {
      listOfCategories.push(category);
      this.listOfCategories$.next(listOfCategories);
    }
  }

  delete(category: string, listOfCategories: string[]): string | null {
    const index = listOfCategories.findIndex(item => item === category);
    let oldCategory = null;
    if(index !== -1) {
      oldCategory = listOfCategories[index];
      listOfCategories.splice(index, 1);
      this.listOfCategories$.next(listOfCategories);
    }
    return oldCategory;
  }

  changeCategory(oldCategory: string, newCategory: string, listOfCategories: string[]): string | null {
    let index: number | null = null;
    for(let i: number = 0; i < listOfCategories.length; i++) {
      if(listOfCategories[i] === newCategory) {
        return null;
      }
      else if(listOfCategories[i] === oldCategory && listOfCategories[i] !== newCategory) {
        index = i;
      }
    }
    if(index !== null) {
      listOfCategories[index] = newCategory;
      this.listOfCategories$.next(listOfCategories);
      return oldCategory;
    }
    return null;
  }

}
