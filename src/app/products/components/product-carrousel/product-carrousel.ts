import {
  AfterViewInit, Component, effect, ElementRef, input, OnChanges, SimpleChanges,
  viewChild,
  viewChildren
} from '@angular/core';
// import Swiper JS
import Swiper from 'swiper';
import {Navigation, Pagination} from 'swiper/modules';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {ProductImagePipe} from '@products/pipes/product-image-pipe';


@Component({
  selector: 'product-carrousel',
  imports: [
    ProductImagePipe
  ],
  templateUrl: './product-carrousel.html',
  styleUrl: './product-carrousel.css'
})
export class ProductCarrousel implements AfterViewInit, OnChanges {


  images = input.required<string[]>()
  swiperDivElement = viewChild.required<ElementRef>('swiper');

  ngAfterViewInit(): void {
    this.swiperInit()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'].firstChange) {
      return
    } else {
      this.swiperInit()
    }
  }

  swiperInit() {

    const element = this.swiperDivElement().nativeElement

    if (!element) {
      return;
    }

    const swiper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      modules: [Navigation, Pagination],

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }

}
