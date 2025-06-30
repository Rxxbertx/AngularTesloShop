import {Component, inject} from '@angular/core';
import {ProductCard} from '@products/components/product-card/product-card';
import {ProductService} from '@products/services/product-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {Pagination} from '../../../shared/components/pagination/pagination';
import {PaginationService} from '../../../shared/services/pagination-service';

@Component({
  selector: 'app-home-page',
  imports: [
    ProductCard,
    Pagination
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {

  productService = inject(ProductService);
  paginationService = inject(PaginationService);

  productResource = rxResource(
    {
      params: () => (
        {
          page: this.paginationService.currentPage() - 1,
          limit: 9
        }
      ),
      stream: ({params}) => {
        return this.productService.getProducts({
          offset: params.page * params.limit,
          limit: params.limit
        })
      }
    }
  )


}
