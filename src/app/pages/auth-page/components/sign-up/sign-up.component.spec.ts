import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth-service/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule], // HttpClientTestingModule для тестирования HttpClient
      providers: [
        AuthService,
        Router
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize signUpForm with required controls', () => {
    const nameControl = component.signUpForm.get('name');
    const loginControl = component.signUpForm.get('login');
    const passwordControl = component.signUpForm.get('password');

    expect(nameControl).toBeTruthy();
    expect(loginControl).toBeTruthy();
    expect(passwordControl).toBeTruthy();
    expect(loginControl?.validator).toBe(Validators.required);
    expect(passwordControl?.validator).toBe(Validators.required);
  });

  it('should call authService.postToSignUp if signUpForm is valid', fakeAsync(() => {
    const signUpData = { name: 'John', login: 'test', password: 'password' };
    spyOn(authService, 'postToSignUp').and.returnValue(of({}));

    component.signUpForm.setValue(signUpData);
    component.signUp();

    tick(); // ending async operation

    expect(authService.postToSignUp).toHaveBeenCalledWith(signUpData);
  }));

  it('should log response if authService.postToSignUp returns a response', fakeAsync(() => {
    const response = { message: 'Registration successful' };
    spyOn(authService, 'postToSignUp').and.returnValue(of(response));
    spyOn(console, 'log');

    component.signUpForm.setValue({ name: 'John', login: 'test', password: 'password' });
    component.signUp();

    tick();

    expect(console.log).toHaveBeenCalledWith(response);
  }));

  it('should handle error if authService.postToSignUp returns an error', fakeAsync(() => {
    spyOn(authService, 'postToSignUp').and.returnValue(throwError({ status: 500 }));
    spyOn(console, 'error');

    component.signUpForm.setValue({ name: 'John', login: 'test', password: 'password' });
    component.signUp();

    tick();

    expect(console.error).toHaveBeenCalledWith('Error:', jasmine.any(Object));
  }));
});
