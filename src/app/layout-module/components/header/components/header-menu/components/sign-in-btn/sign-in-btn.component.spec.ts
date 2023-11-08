import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInBtnComponent } from './sign-in-btn.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SignInComponent', () => {
  let component: SignInBtnComponent;
  let fixture: ComponentFixture<SignInBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SignInBtnComponent]
    });
    fixture = TestBed.createComponent(SignInBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
