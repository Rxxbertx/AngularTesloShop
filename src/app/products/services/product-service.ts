import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Gender, Product, ProductsResponse} from '@products/interfaces/products-response-interfaces';
import {environment} from '../../../environments/environment';
import {forkJoin, map, Observable, of, switchMap, tap} from 'rxjs';
import {User} from '@auth/interfaces/user-interface';

const baseUrl = environment.baseUrl

const emptyProduct: Product = {
  description: '',
  gender: Gender.Men,
  id: 'new',
  images: [],
  price: 0,
  sizes: [],
  slug: '',
  stock: 0,
  tags: [],
  title: '',
  user: {} as User
}


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


  getProductById(id: string) {

    if (id === 'new') {
      return of(emptyProduct)
    }

    if (this.individualProductsCache.has(id)) {
      return of(this.individualProductsCache.get(id)!)
    }

    return this.httpClient.get<Product>(`${baseUrl}/products/${id}`).pipe(
      tap(values => this.individualProductsCache.set(id, values))
    )
  }

  updateProduct(productLike: Partial<Product>, imagesFileList?: FileList): Observable<Product> {


    const currentImages = productLike.images ?? []

    return this.uploadImages(imagesFileList)
      .pipe(
        map(imagesNames => (
            {
              ...productLike,
              images: [...currentImages, ...imagesNames]
            }
          )
        )
        , switchMap((updatedProduct) => this.httpClient.patch<Product>(`${baseUrl}/products/${productLike.id}`, updatedProduct)
        )
        , tap((value) => {
          this.updateProductCache(value)
        })
      )

  }

  createProduct(productLike: Partial<Product>, imagesFileList?: FileList): Observable<Product> {

    const currentImages = productLike.images ?? []

    return this.uploadImages(imagesFileList)
      .pipe(
        map(imagesNames => (
            {
              ...productLike,
              images: [...currentImages, ...imagesNames]
            }
          )
        )
        , switchMap((updatedProduct) => this.httpClient.post<Product>(`${baseUrl}/products`, updatedProduct)
        )
        , tap((value) => {
          this.updateProductCache(value)
        })
      )

  }

  updateProductCache(product: Product) {
    const id = product.id;
    this.individualProductsCache.set(id, product);
    this.individualProductsCache.set(product.slug, product);

    this.productsCache.forEach((productResponse) => {
      productResponse.products.map((value) => {
        if (value.id === id)
          return product

        return value
      })
    })


  }


  uploadImages(images?: FileList): Observable<string[]> {

    if (!images) {
      return of([])
    }
    const uploadObservables = Array.from(images).map((image) =>
      this.uploadImage(image)
    )
    return forkJoin(uploadObservables)


  }

  uploadImage(image: File): Observable<string> {

    const formData = new FormData();
    formData.append('file', image)

    return this.httpClient.post<{ fileName: string }>(`${baseUrl}/files/product/${image}`, formData).pipe(
      map((resp) => resp.fileName)
    )


  }

}
