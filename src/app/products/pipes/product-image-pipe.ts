import {Pipe, PipeTransform} from '@angular/core';
import {environment} from '../../../environments/environment';

const baseUrl = environment.baseUrl;

@Pipe({
  name: 'productImage'
})
export class ProductImagePipe implements PipeTransform {

  transform(value: string | string[]): any {

    const defaultImage = "/assets/images/no-image.jpg"
    const imageUrl = baseUrl+"/files/product/"

    if (!value) {
      return defaultImage;
    }


    if (value instanceof Array) {
      return value[0] ? imageUrl + value[0] : defaultImage;
    }

    if (value.startsWith('blob:'))
      return value;

    return imageUrl + value;

  }

}
