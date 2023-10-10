import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListSearchComponent } from './product-list-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductListSearchComponent', () => {
  let component: ProductListSearchComponent;
  let fixture: ComponentFixture<ProductListSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProductListSearchComponent]
    });
    fixture = TestBed.createComponent(ProductListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
