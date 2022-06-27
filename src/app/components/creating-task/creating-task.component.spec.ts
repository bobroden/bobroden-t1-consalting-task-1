import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingTaskComponent } from './creating-task.component';

describe('RunComponent', () => {
  let component: CreatingTaskComponent;
  let fixture: ComponentFixture<CreatingTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatingTaskComponent ]
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