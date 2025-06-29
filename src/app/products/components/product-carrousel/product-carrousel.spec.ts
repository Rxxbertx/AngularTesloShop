import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCarrousel } from './product-carrousel';

describe('ProductCarrousel', () => {
  let component: ProductCarrousel;
  let fixture: ComponentFixture<ProductCarrousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCarrousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCarrousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
