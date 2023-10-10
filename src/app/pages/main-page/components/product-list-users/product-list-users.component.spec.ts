import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListUsersComponent } from './product-list-users.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductListUsersComponent', () => {
  let component: ProductListUsersComponent;
  let fixture: ComponentFixture<ProductListUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProductListUsersComponent]
    });
    fixture = TestBed.createComponent(ProductListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
