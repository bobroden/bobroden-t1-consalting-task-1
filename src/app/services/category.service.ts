import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private listOfCategories: string[] = [];

  constructor() { }

  setListOfCategories(list: string[]): void {
    this.listOfCategories = list;
  }

  getListOfCategories(): string[] {
    return this.listOfCategories;
  }

  add(category: string): void {
    const index = this.listOfCategories.findIndex(item => item === category);
    if(index === -1) {
      this.listOfCategories.push(category);
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
    let index: number | null = null;
    for(let i: number = 0; i < this.listOfCategories.length; i++) {
      if(this.listOfCategories[i] === newCategory) {
        return null;
      }
      else if(this.listOfCategories[i] === oldCategory && this.listOfCategories[i] !== newCategory) {
        index = i;
      }
    }
    if(index !== null) {
      this.listOfCategories[index] = newCategory;
      return oldCategory;
    }
    return null;
  }

}
