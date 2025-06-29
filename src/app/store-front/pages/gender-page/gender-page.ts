import {Component, inject} from '@angular/core';
import {ProductCard} from '@products/components/product-card/product-card';
import {ActivatedRoute} from '@angular/router';
import {rxResource, toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {TitleCasePipe} from '@angular/common';
import {ProductService} from '@products/services/product-service';

@Component({
  selector: 'app-gender-page',
  imports: [
    ProductCard,
    TitleCasePipe
  ],
  templateUrl: './gender-page.html',
  styleUrl: './gender-page.css'
})
export class GenderPage {

  route = inject(ActivatedRoute);
  gender = toSignal(
    this.route.params.pipe(map(({gender}) => gender)
    )
  )

  productService = inject(ProductService);

  productResource= rxResource(
    {
      params: () => (
        {gender: this.gender()}
      ),
      stream: ({params}) => {
        return this.productService.getProducts({gender:params.gender})
      }
    }
  )



}
