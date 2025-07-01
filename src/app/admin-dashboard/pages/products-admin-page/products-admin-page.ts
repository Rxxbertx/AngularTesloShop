import {Component, inject, signal, viewChildren} from '@angular/core';
import {ProductAdminTable} from '@products/components/product-admin-table/product-admin-table';
import {Pagination} from '../../../shared/components/pagination/pagination';
import {ProductService} from '@products/services/product-service';
import {PaginationService} from '../../../shared/services/pagination-service';
import {rxResource} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-products-admin-page',
  imports: [
    ProductAdminTable,
    Pagination
  ],
  templateUrl: './products-admin-page.html',
  styleUrl: './products-admin-page.css'
})
export class ProductsAdminPage {

  productService = inject(ProductService);
  paginationService = inject(PaginationService);

  productsPerPage = signal(10)


  productResource = rxResource(
    {
      params: () => (
        {
          page: this.paginationService.currentPage() - 1,
          limit: this.productsPerPage()
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
