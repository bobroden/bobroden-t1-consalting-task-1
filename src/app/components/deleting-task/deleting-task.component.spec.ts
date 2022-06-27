import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletingTaskComponent } from './deleting-task.component';

describe('RunComponent', () => {
  let component: DeletingTaskComponent;
  let fixture: ComponentFixture<DeletingTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletingTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletingTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});