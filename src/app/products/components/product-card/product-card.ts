import {Component, computed, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SlicePipe} from '@angular/common';
import {Product} from '@products/interfaces/products-response-interfaces';
import {ProductImagePipe} from '@products/pipes/product-image-pipe';

@Component({
  selector: 'app-product-card',
  imports: [
    RouterLink,
    SlicePipe,
    ProductImagePipe
  ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {

  product = input.required<Product>()

  imgUrl = computed(

    () => {
      return `${this.product().images[0]}`;
    }

  )


}
