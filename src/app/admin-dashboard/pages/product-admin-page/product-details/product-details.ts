import {Component, inject, input, OnInit, signal} from '@angular/core';
import {Product} from '@products/interfaces/products-response-interfaces';
import {ProductCarrousel} from '@products/components/product-carrousel/product-carrousel';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormUtils} from '@products/utils/form-utils';
import {FormErrorLabel} from '../../../../shared/components/form-error-label/form-error-label';
import {ProductService} from '@products/services/product-service';
import {Router} from '@angular/router';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-product-details',
  imports: [
    ProductCarrousel,
    ReactiveFormsModule,
    FormErrorLabel
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {


  product = input.required<Product>()

  fb = inject(FormBuilder)
  productService = inject(ProductService)
  router = inject(Router)

  wasSaved = signal(false)
  tempImages = signal<string[]>([])
  imageFileList : FileList  | undefined = undefined;

  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    price: [0, Validators.required, Validators.min(0)],
    stock: [0, Validators.required, Validators.min(0)],
    sizes: [[""]],
    images: [['']],
    tags: [''],
    gender: ['men', [Validators.required, Validators.pattern(/men|women|kid|unisex/)]],
  })

  sizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  ngOnInit(): void {

    this.setFormValue(this.product())

  }

  setFormValue(form: Partial<Product>): void {

    this.productForm.reset(form as any)
    this.productForm.patchValue({tags: form.tags?.join(', ')})

  }

  onSizeChange(size: string) {
    const currentSizes = this.productForm.value.sizes ?? [];

    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1);
    } else {
      currentSizes.push(size);
    }

    this.productForm.patchValue({sizes: currentSizes})

  }

  async onSubmit() {

    this.productForm.markAllAsTouched()

    const isValid = this.productForm.valid;

    if (!isValid) {
      return;
    }

    const formValue = this.productForm.value;

    const productLike: Partial<Product> = {
      ...(formValue as any),
      tags: formValue.tags?.toLowerCase().trim().split(',') ?? []

    }

    if (this.product().id === 'new') {

      const product = await firstValueFrom(
        this.productService.createProduct(productLike, this.imageFileList)
      )
      this.router.navigate(['/admin/product/', product.id])


    } else {
     await firstValueFrom(
        this.productService.updateProduct(productLike, this.imageFileList)
      )

      this.wasSaved.set(true);
      setTimeout(() => {
        this.wasSaved.set(false);
      }, 3000)

    }


  }

  onFilesChanged($event: Event) {

    this.product().images.filter((value: string) => {
      return !this.tempImages().includes(value);
    })


    const fileList = ($event.target as HTMLInputElement).files;
    this.tempImages.set([])
    this.imageFileList = fileList ?? undefined

    //genera unas urls para renderizar esas imagenes
    const imageUrls = Array.from(fileList ?? []).map((value) => URL.createObjectURL(value));

    this.tempImages.set(imageUrls);
    this.product().images.push(...imageUrls)




  }
}
