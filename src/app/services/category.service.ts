import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  listOfCategories: string[] = [];

  constructor() { }

  add(category: string): string | void {
    const index = this.listOfCategories.findIndex(item => item === category);
    if(index === -1) {
      this.listOfCategories.push(category);
      return category;
    }
  }

  delete(category: string): string | null {
    const index = this.listOfCategories.findIndex(item => item === category);
    let oldCategory = null;
    if(index !== -1) {
      oldCategory = this.listOfCategories[index];
      this.listOfCategories.splice(index, 1);
    }
    return oldCategory;
  }

  changeCategory(oldCategory: string, newCategory: string): string | null {
    for(let i = 0; i < this.listOfCategories.length; i++) {
      if(this.listOfCategories[i] === oldCategory) {
        this.listOfCategories[i] = newCategory;
      }
    }
    return oldCategory;
  }

}
