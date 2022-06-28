import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryService } from 'src/app/services/category.service';
import { TaskService } from 'src/app/services/task.service';

import { CategoryComponent } from './category.component';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryComponent ],
      imports: [
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        BrowserAnimationsModule
      ],
      providers: [
        CategoryService,
        TaskService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be addFormControl invalid', () => {
    const ctrl = component.categoryForm.get('addFormControl');

    ctrl?.setValue(null);
    expect(ctrl?.invalid).toBeTruthy();

    ctrl?.setValue('1');
    expect(ctrl?.invalid).toBeTruthy();

    ctrl?.setValue('bb');
    expect(ctrl?.invalid).toBeTruthy();
  });

  it('should be changeFormControl disabled', () => {
    const ctrl = component.categoryForm.get('changeFormControl');

    component.isChange = false;
    expect(ctrl?.disabled).toBeTruthy();

  });

  it('should be addFormControl valid', () => {
    const ctrl = component.categoryForm.get('addFormControl');

    ctrl?.setValue('add');
    expect(ctrl?.valid).toBeTruthy();

    ctrl?.setValue('bob');
    expect(ctrl?.valid).toBeTruthy();
  })

  it('should listOfCategories length be more', () => {
    const ctrl = component.categoryForm.get('addFormControl');

    ctrl?.setValue('add');
    component.addCategory();
    expect(component.listOfCategories.length).toBeGreaterThan(0);
  })

  it('should listOfCategories length be less', () => {
    component.deleteCategory('add');
    expect(component.listOfCategories.length).toBe(0);
  })

  it('should category be changed', () => {
    const addCtrl = component.categoryForm.get('addFormControl');
    const changeCtrl = component.categoryForm.get('changeFormControl');

    addCtrl?.setValue('add');
    component.addCategory();
    addCtrl?.setValue('create');
    component.addCategory();

    component.changeMode('add');
    changeCtrl?.setValue('read');
    component.changeCategory();

    expect(component.listOfCategories[0]).toBe('read');
  })

});