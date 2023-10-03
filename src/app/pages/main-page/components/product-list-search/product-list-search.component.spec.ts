import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListSearchComponent } from './product-list-search.component';

describe('ProductListSearchComponent', () => {
  let component: ProductListSearchComponent;
  let fixture: ComponentFixture<ProductListSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
