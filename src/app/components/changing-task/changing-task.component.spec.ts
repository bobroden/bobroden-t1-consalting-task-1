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
      imports: [MatDialogModule, ReactiveFormsModule, MatInputModule, MatSelectModule, BrowserAnimationsModule],
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
    fixture.detectChanges();
    expect(ctrl?.invalid).toBeTruthy();

    ctrl?.setValue('');
    fixture.detectChanges();
    expect(ctrl?.invalid).toBeTruthy();

    ctrl?.setValue('b');
    fixture.detectChanges();
    expect(ctrl?.invalid).toBeTruthy();

    ctrl?.setValue('22');
    fixture.detectChanges();
    expect(ctrl?.invalid).toBeTruthy();

  });

  it('should be nameFormControl valid', () => {
    const ctrl = component.changingTaskForm.get('nameFormControl');

    ctrl?.setValue('create');
    fixture.detectChanges();
    expect(ctrl?.valid).toBeTruthy();

    ctrl?.setValue('run');
    fixture.detectChanges();
    expect(ctrl?.valid).toBeTruthy();

  });
});