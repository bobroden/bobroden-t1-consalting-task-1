import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { CategoryService } from '../services/category.service';
import { TaskService } from '../services/task.service';

import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  displayedColums: string[] = ['name', 'actions']
  dataSource: MatTableDataSource<string>;

  @ViewChild(MatTable) table: MatTable<Task>;

  addFormControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  changeFormControl: FormControl = new FormControl({value: '', disabled: true}, [Validators.required, Validators.minLength(3)]);

  addValueSub: Subscription;
  changeValueSub: Subscription;

  oldChangeValue: string = '';
  
  addInputValue: string = '';
  changeInputValue: string = '';

  isChange: boolean = false;

  constructor(public categoryService: CategoryService, private taskService: TaskService, public dialog: MatDialog,) {
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

  openDialog(data: string): void {
    this.dialog.open(ErrorComponent, {
      data: data
    })
  }

  addCategory(): void {
    if(this.addFormControl.valid && this.addInputValue.trim() !== '') {
      const index = this.categoryService.listOfCategories.length;
      this.categoryService.add(this.addInputValue.trim());
      this.dataSource = new MatTableDataSource(this.categoryService.listOfCategories);
      if(index === this.categoryService.listOfCategories.length) {
        this.openDialog('There is already such a category!');
      }
    }
  }

  deleteCategory(category: string): void {
    this.categoryService.delete(category);
    this.dataSource = new MatTableDataSource(this.categoryService.listOfCategories);

    this.taskService.listOfTasks.forEach(item => {
      if(item.category.length !== 0) {
        for(let i = 0; i < item.category.length; i++) {
          if(category === item.category[i])
          item.category.splice(i, 1);
        }
      }
    })
  }

  changeMode(category: string): void {
    this.isChange = true;
    this.changeFormControl.enable();
    this.oldChangeValue = category;
    this.changeFormControl.setValue(category);
  }

  changeCategory(): void {
    if(this.changeFormControl.valid && this.changeInputValue.trim() !== '') {
      if(this.categoryService.changeCategory(this.oldChangeValue, this.changeInputValue.trim())) {
        this.dataSource = new MatTableDataSource(this.categoryService.listOfCategories);
      
        this.taskService.listOfTasks.forEach(item => {
          if(item.category.length !== 0) {
            for(let i = 0; i < item.category.length; i++) {
              if(this.oldChangeValue === item.category[i])
              item.category[i] = this.changeInputValue.trim()
            }
          }
        })

        this.isChange = false;
        this.changeFormControl.disable();
        this.oldChangeValue = '';
        this.changeFormControl.setValue('');
      }
      else {
        this.openDialog('There is already such a category!');
      }
    }
  }

}
