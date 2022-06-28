import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryService } from 'src/app/services/category.service';
import { TaskService } from 'src/app/services/task.service';

import { ChangingTaskComponent } from './changing-task.component';

describe('ChangingTaskComponent', () => {
  let component: ChangingTaskComponent;
  let fixture: ComponentFixture<ChangingTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangingTaskComponent ],
      imports: [
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule
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

    fixture = TestBed.createComponent(ChangingTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be nameFormControl invalid', () => {
    const ctrl = component.changingTaskForm.get('nameFormControl');

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
    const ctrl = component.changingTaskForm.get('nameFormControl');

    ctrl?.setValue('create');
    expect(ctrl?.valid).toBeTruthy();

    ctrl?.setValue('run');
    expect(ctrl?.valid).toBeTruthy();

  });

  it('should be form right', () => {
    const ctrl = component.changingTaskForm.get('nameFormControl');
    const startDate = component.changingTaskForm.get('startDateFormControl');
    const endDate = component.changingTaskForm.get('endDateFormControl');

    ctrl?.setValue('create');
    startDate?.setValue('2022-06-23');
    endDate?.setValue('2022-05-31');
    expect(component.changingTaskForm.invalid).toBeTruthy();

    endDate?.setValue('');
    expect(component.changingTaskForm.valid).toBeTruthy();
  });
});