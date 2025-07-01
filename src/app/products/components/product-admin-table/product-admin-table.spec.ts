import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdminTable } from './product-admin-table';

describe('ProductAdminTable', () => {
  let component: ProductAdminTable;
  let fixture: ComponentFixture<ProductAdminTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAdminTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAdminTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
