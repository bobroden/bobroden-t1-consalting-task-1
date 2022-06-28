import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { TaskService } from 'src/app/services/task.service';

import { ListOfTasksComponent } from './list-of-tasks.component';

describe('ListOfTasksComponent', () => {
  let component: ListOfTasksComponent;
  let fixture: ComponentFixture<ListOfTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfTasksComponent ],
      imports:  [
        MatDialogModule,
        MatTableModule
      ],
      providers: [
        TaskService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});