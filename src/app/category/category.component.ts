import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  displayedColums: string[] = ['name', 'actions']
  dataSource: MatTableDataSource<string>;

  @ViewChild(MatTable) table: MatTable<Task>;

  addFormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  changeFormControl = new FormControl({value: '', disabled: true}, [Validators.required, Validators.minLength(3)]);

  addValueSub: Subscription;
  changeValueSub: Subscription;

  oldChangeValue = '';
  
  addInputValue = '';
  changeInputValue = '';

  isChange = false;

  constructor(public categoryService: CategoryService) {
    this.dataSource = new MatTableDataSource(this.categoryService.listOfCategories);
  }

  ngOnInit(): void {
    this.addValueSub = this.addFormControl.valueChanges.subscribe(value => this.addInputValue = value ? value : '');
    this.changeValueSub = this.changeFormControl.valueChanges.subscribe(value => this.changeInputValue = value ? value : '');
  }

  ngOnDestroy(): void {
    this.addValueSub.unsubscribe();
    this.changeValueSub.unsubscribe();
  }

  addCategory(): void {
    if(this.addFormControl.valid && this.addInputValue.trim() !== '') {
      this.categoryService.add(this.addInputValue.trim());
      this.dataSource = new MatTableDataSource(this.categoryService.listOfCategories);
      this.addFormControl.setValue('');
    }
  }

  deleteCategory(category: string): void {
    this.categoryService.delete(category);
    this.dataSource = new MatTableDataSource(this.categoryService.listOfCategories);
  }

  changeMode(category: string): void {
    this.isChange = true;
    this.changeFormControl.enable();
    this.oldChangeValue = category;
    this.changeFormControl.setValue(category);
  }

  changeCategory(): void {
    if(this.changeFormControl.valid && this.changeInputValue.trim() !== '') {
      this.categoryService.changeCategory(this.oldChangeValue, this.changeInputValue.trim());
      this.dataSource = new MatTableDataSource(this.categoryService.listOfCategories);
      this.isChange = false;
      this.changeFormControl.disable();
      this.oldChangeValue = '';
      this.changeFormControl.setValue('');
    }
  }

}
