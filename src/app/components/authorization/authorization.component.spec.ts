import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoryService } from 'src/app/services/category.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

import { AuthorizationComponent } from './authorization.component';

describe('AuthorizationComponent', () => {
  let component: AuthorizationComponent;
  let fixture: ComponentFixture<AuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationComponent ],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatSlideToggleModule,
        BrowserAnimationsModule
      ],
      providers: [
        UserService,
        TaskService,
        CategoryService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be emailFormControl invalid', () => {
    const ctrl = component.authorizationForm.get('emailFormControl');

    ctrl?.setValue(null);
    fixture.detectChanges();
    expect(ctrl?.invalid).toBeTruthy();

    ctrl?.setValue('bbbdd');
    fixture.detectChanges();
    expect(ctrl?.invalid).toBeTruthy();

    ctrl?.setValue('bb');
    fixture.detectChanges();
    expect(ctrl?.invalid).toBeTruthy();
  });

  it('should be passwordFormControl invalid', () => {
    const ctrl = component.authorizationForm.get('passwordFormControl');

    ctrl?.setValue(null);
    fixture.detectChanges();
    expect(ctrl?.invalid).toBeTruthy();

    ctrl?.setValue('bbbdd');
    fixture.detectChanges();
    expect(ctrl?.invalid).toBeTruthy();

    ctrl?.setValue('bB23');
    fixture.detectChanges();
    expect(ctrl?.invalid).toBeTruthy();
  });

  it('should be emailFormControl valid', () => {
    const ctrl = component.authorizationForm.get('emailFormControl');

    ctrl?.setValue('bb@dd');
    fixture.detectChanges();
    expect(ctrl?.valid).toBeTruthy();

    ctrl?.setValue('bobrov@denis');
    fixture.detectChanges();
    expect(ctrl?.valid).toBeTruthy();
  })

  it('should be passwordFormControl valid', () => {
    const ctrl = component.authorizationForm.get('passwordFormControl');

    ctrl?.setValue('12zS.');
    fixture.detectChanges();
    expect(ctrl?.valid).toBeTruthy();

    ctrl?.setValue('as2A!');
    fixture.detectChanges();
    expect(ctrl?.valid).toBeTruthy();
  })
});