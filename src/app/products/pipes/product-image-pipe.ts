import {Pipe, PipeTransform} from '@angular/core';
import {environment} from '../../../environments/environment';

const baseUrl = environment.baseUrl;

@Pipe({
  name: 'productImage'
})
export class ProductImagePipe implements PipeTransform {

  transform(value: string | string[]): any {

    const defaultImage = "/assets/images/no-image.jpg"

    if (!value) {
      return defaultImage;
    }


    if (value instanceof Array) {
      return value[0] ? baseUrl + '/' + value[0] : defaultImage;
    }

    if (value.startsWith('blob:'))
      return value;

    return baseUrl + '/' + value;

  }

}
