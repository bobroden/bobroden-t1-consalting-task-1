import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryService } from 'src/app/services/category.service';
import { TaskService } from 'src/app/services/task.service';

import { CreatingTaskComponent } from './creating-task.component';

describe('CreatingTaskComponent', () => {
  let component: CreatingTaskComponent;
  let fixture: ComponentFixture<CreatingTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatingTaskComponent ],
      imports: [
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatDialogModule
      ],
      providers: [
        TaskService,
        CategoryService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatingTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be nameFormControl invalid', () => {
    const ctrl = component.newTaskForm.get('nameFormControl');

    ctrl?.setValue(null);
    expect(ctrl?.invalid).toBeTruthy();

    ctrl?.setValue('');
    expect(ctrl?.invalid).toBeTruthy();

    ctrl?.setValue('b');
    expect(ctrl?.invalid).toBeTruthy();

    ctrl?.setValue('22');
    expect(ctrl?.invalid).toBeTruthy();

  });

  it('should be nameFormControl valid', () => {
    const ctrl = component.newTaskForm.get('nameFormControl');

    ctrl?.setValue('create');
    expect(ctrl?.valid).toBeTruthy();

    ctrl?.setValue('run');
    expect(ctrl?.valid).toBeTruthy();

  });
  
  it('should be form right', () => {
    const ctrl = component.newTaskForm.get('nameFormControl');
    const startDate = component.newTaskForm.get('startDateFormControl');
    const endDate = component.newTaskForm.get('endDateFormControl');

    ctrl?.setValue('create');
    startDate?.setValue('2022-06-23');
    endDate?.setValue('2022-05-31');
    expect(component.newTaskForm.invalid).toBeTruthy();

    endDate?.setValue('');
    expect(component.newTaskForm.valid).toBeTruthy();
  });

});