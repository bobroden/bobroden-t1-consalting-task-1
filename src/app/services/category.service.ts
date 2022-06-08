import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  listOfCategories: string[];

  constructor() { }
}
