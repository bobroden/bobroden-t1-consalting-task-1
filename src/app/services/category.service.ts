import { Injectable } from '@angular/core';

import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  listOfCategories: Category[];

  constructor() { }
}
