import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'productImage'
})
export class ProductImagePipe implements PipeTransform {

  transform(value: string | string[]): any {

    const defaultImage = "/assets/images/no-image.jpg"
    const imageBaseUrl = "http://localhost:3000/api/files/product/"

    if (!value) {
      return defaultImage;
    }


    if (value instanceof Array) {
      return value[0] ? imageBaseUrl + value[0] : defaultImage;
    }

    if (value.startsWith('blob:'))
      return value;

    return imageBaseUrl + value;

  }

}
