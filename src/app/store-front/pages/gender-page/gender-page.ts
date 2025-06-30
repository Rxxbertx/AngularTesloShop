import {Component, inject} from '@angular/core';
import {ProductCard} from '@products/components/product-card/product-card';
import {ActivatedRoute} from '@angular/router';
import {rxResource, toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {TitleCasePipe} from '@angular/common';
import {ProductService} from '@products/services/product-service';
import {PaginationService} from '../../../shared/services/pagination-service';
import {Pagination} from '../../../shared/components/pagination/pagination';

@Component({
  selector: 'app-gender-page',
  imports: [
    ProductCard,
    TitleCasePipe,
    Pagination
  ],
  templateUrl: './gender-page.html',
  styleUrl: './gender-page.css'
})
export class GenderPage {

  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  paginationService = inject(PaginationService);

  gender = toSignal(
    this.route.params.pipe(map(({gender}) => gender)
    )
  )

  productResource= rxResource(
    {
      params: () => (
        {
          gender: this.gender(),
          page: this.paginationService.currentPage()-1,
          limit: 9
        }
      ),
      stream: ({params}) => {
        return this.productService.getProducts(
          {
            gender:params.gender,
            offset: params.page * params.limit,
            limit: params.limit

          }
        )
      }
    }
  )



}
