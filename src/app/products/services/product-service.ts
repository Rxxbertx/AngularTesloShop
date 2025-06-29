import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Gender, Product, ProductsResponse} from '@products/interfaces/products-response-interfaces';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

const baseUrl = environment.baseUrl

interface Options {
  limit?: number;
  offset?: number;
  gender?: Gender;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private httpClient = inject(HttpClient);

  getProducts(options: Options): Observable<ProductsResponse> {

    const {limit = 9, offset = 0, gender = ""} = options;

    return this.httpClient.get<ProductsResponse>(`${baseUrl}/products`, {
      params: {
        limit: limit,
        offset: offset,
        gender: gender
      }
    });
  }

  getProductBySlug(slug: string): Observable<Product> {
    return this.httpClient.get<Product>(`${baseUrl}/products/${slug}`)
  }



}
