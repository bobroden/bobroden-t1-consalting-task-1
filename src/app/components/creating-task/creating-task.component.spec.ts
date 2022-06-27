import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponents } from 'src/app/modules/material.module';
import { CategoryService } from 'src/app/services/category.service';
import { TaskService } from 'src/app/services/task.service';

import { CreatingTaskComponent } from './creating-task.component';

describe('CreatingTaskComponent', () => {
  let component: CreatingTaskComponent;
  let fixture: ComponentFixture<CreatingTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatingTaskComponent ],
      imports: [ReactiveFormsModule, MatSelectModule, MatInputModule, BrowserAnimationsModule, MatDialogModule],
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
});