import {Component, input} from '@angular/core';
import {Product} from '@products/interfaces/products-response-interfaces';
import {ProductImagePipe} from '@products/pipes/product-image-pipe';
import {RouterLink} from '@angular/router';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-product-admin-table',
  imports: [
    ProductImagePipe,
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './product-admin-table.html',
  styleUrl: './product-admin-table.css'
})
export class ProductAdminTable {

  products = input.required<Product[]>()


}
