import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangingTaskComponent } from './changing-task.component';

describe('RunComponent', () => {
  let component: ChangingTaskComponent;
  let fixture: ComponentFixture<ChangingTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangingTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangingTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});