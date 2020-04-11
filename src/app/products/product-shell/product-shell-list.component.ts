import {Component, OnDestroy, OnInit} from '@angular/core';

import { IProduct } from '../product';
import { ProductService } from '../product.service';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'pm-product-shell-list',
  templateUrl: './product-shell-list.component.html'
})
export class ProductShellListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;
  products: IProduct[];
  selectedProduct: IProduct | null;
  private selectedProductSub: Subscription;
  private productsSub: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.selectedProductSub = this.productService.selectedProductChanges$.subscribe((aProduct) => {
      this.selectedProduct = aProduct;
    });

    this.productsSub = this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
      },
      (error: any) => this.errorMessage = <any>error
    );
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
    this.selectedProductSub.unsubscribe();
  }

  onProductSelected(prod: IProduct): void {
    this.productService.changeSelectedProduct(prod);
  }

}
