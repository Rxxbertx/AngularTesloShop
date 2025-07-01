import {Component, inject, input, OnInit} from '@angular/core';
import {Product} from '@products/interfaces/products-response-interfaces';
import {ProductCarrousel} from '@products/components/product-carrousel/product-carrousel';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormUtils} from '@products/utils/form-utils';

@Component({
  selector: 'app-product-details',
  imports: [
    ProductCarrousel,
    ReactiveFormsModule
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {


  product = input.required<Product>()

  fb = inject(FormBuilder)

  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: ['', [Validators.required,Validators.pattern(FormUtils.slugPattern)]],
    price: [0, Validators.required, Validators.min(0)],
    stock: [0, Validators.required, Validators.min(0)],
    sizes: [[""]],
    images: [['']],
    tags: [''],
    gender: ['men', [Validators.required, Validators.pattern(/men|women|kid|unisex/)]],
  })

  sizes: string[] = ['XS','S', 'M', 'L', 'XL','XXL'];

  ngOnInit(): void {

    this.setFormValue(this.product())

  }

  setFormValue(form: Partial<Product>): void {

    this.productForm.reset(form as any)
    this.productForm.patchValue({tags: form.tags?.join(', ')})

  }

  onSizeChange(size:string){
    const currentSizes = this.productForm.value.sizes ?? [];

    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1);
    }else{
      currentSizes.push(size);
    }

    this.productForm.patchValue({sizes: currentSizes})

  }

  onSubmit() {



  }
}
