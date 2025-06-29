import {Component, inject} from '@angular/core';
import {ProductCard} from '@products/components/product-card/product-card';
import {ProductService} from '@products/services/product-service';
import {rxResource} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-page',
  imports: [
    ProductCard
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {

  productService = inject(ProductService);

  productResource= rxResource(
    {
      params: () => (
        {}
      ),
      stream: ({params}) => {
        return this.productService.getProducts({})
      }
    }
  )


}
