import {Component, inject} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {rxResource} from '@angular/core/rxjs-interop';
import {ProductService} from '@products/services/product-service';
import {ProductCarrousel} from '@products/components/product-carrousel/product-carrousel';

@Component({
  selector: 'app-product-page',
  imports: [
    ProductCarrousel
  ],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css'
})
export class ProductPage {


  productIdSlug = inject(ActivatedRoute).snapshot.paramMap.get('productId');
  productService = inject(ProductService);

  //rx resource

  productResource = rxResource(
    {
      params:()=>({slug:this.productIdSlug??"null"}),
      stream: ({params})=>{
        return this.productService.getProductBySlug(params.slug)
      }
    }
  )

}
