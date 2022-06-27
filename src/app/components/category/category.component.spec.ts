import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTable, MatTableModule } from '@angular/material/table';
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
        MatTableModule
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
    fixture.detectChanges();
    expect(ctrl?.invalid).toBeTruthy();

    ctrl?.setValue('1');
    fixture.detectChanges();
    expect(ctrl?.invalid).toBeTruthy();

    ctrl?.setValue('bb');
    fixture.detectChanges();
    expect(ctrl?.invalid).toBeTruthy();
  });

  it('should be changeFormControl disabled', () => {
    const ctrl = component.categoryForm.get('changeFormControl');

    component.isChange = false;
    fixture.detectChanges();
    expect(ctrl?.disabled).toBeTruthy();

  });

  it('should be addFormControl valid', () => {
    const ctrl = component.categoryForm.get('addFormControl');

    ctrl?.setValue('add');
    fixture.detectChanges();
    expect(ctrl?.valid).toBeTruthy();

    ctrl?.setValue('bob');
    fixture.detectChanges();
    expect(ctrl?.valid).toBeTruthy();
  })
});