import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationPopupComponent } from './authorization-popup.component';

describe('AuthorizationPopupComponent', () => {
  let component: AuthorizationPopupComponent;
  let fixture: ComponentFixture<AuthorizationPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorizationPopupComponent]
    });
    fixture = TestBed.createComponent(AuthorizationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
