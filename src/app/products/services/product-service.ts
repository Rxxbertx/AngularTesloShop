import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Gender, Product, ProductsResponse} from '@products/interfaces/products-response-interfaces';
import {environment} from '../../../environments/environment';
import {Observable, of, tap} from 'rxjs';

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

  private productsCache = new Map<string, ProductsResponse>();
  private individualProductsCache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductsResponse> {

    const {limit = 9, offset = 0, gender = ""} = options;

    const key = `${limit}-${offset}-${gender}`;

    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!)
    }

    return this.httpClient.get<ProductsResponse>(`${baseUrl}/products`, {
      params: {
        limit: limit,
        offset: offset,
        gender: gender
      }
    }).pipe(tap(values => this.productsCache.set(key, values)));
  }

  getProductBySlug(slug: string): Observable<Product> {

    const key = `${slug}`

    if (this.individualProductsCache.has(key)) {
      return of(this.individualProductsCache.get(key)!)
    }

    return this.httpClient.get<Product>(`${baseUrl}/products/${slug}`).pipe(
      tap(values => this.individualProductsCache.set(key, values))
    )
  }


  getProductById(id:string) {
    const key = `${id}`

    if (this.individualProductsCache.has(key)) {
      return of(this.individualProductsCache.get(key)!)
    }

    return this.httpClient.get<Product>(`${baseUrl}/products/${id}`).pipe(
      tap(values => this.individualProductsCache.set(key, values))
    )
  }
}
