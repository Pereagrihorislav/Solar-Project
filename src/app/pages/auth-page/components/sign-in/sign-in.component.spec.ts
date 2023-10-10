import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { SignInComponent } from './sign-in.component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule], 
      providers: [
        AuthService,
        Router]
        
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to main if authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    spyOn(router, 'navigate');

    component.ngOnInit();

    expect(router.navigate).toHaveBeenCalledWith(['/main']);
  });

  it('should initialize signInForm with required controls', () => {
    const loginControl = component.signInForm.get('login');
    const passwordControl = component.signInForm.get('password');

    expect(loginControl).toBeTruthy();
    expect(passwordControl).toBeTruthy();
    expect(loginControl?.validator).toBe(Validators.required);
    expect(passwordControl?.validator).toBe(Validators.required);
  });

  it('should call authService.postToSignIn and navigate to main if signInForm is valid', fakeAsync(() => {
    const signInData = { login: 'test', password: 'password' };
    spyOn(authService, 'postToSignIn').and.returnValue(of({}));

    component.signInForm.setValue(signInData);
    component.signIn();

    tick(); // ending async operation

    expect(authService.postToSignIn).toHaveBeenCalledWith(signInData);
    expect(router.navigate).toHaveBeenCalledWith(['/main']);
  }));

  it('should set badGatewayStatus to true if authService.postToSignIn returns an error', fakeAsync(() => {
    spyOn(authService, 'postToSignIn').and.returnValue(throwError({ status: 502 }));

    component.signInForm.setValue({ login: 'test', password: 'password' });
    component.signIn();

    tick();

    expect(component.badGatewayStatus).toBe(true);
  }));
});