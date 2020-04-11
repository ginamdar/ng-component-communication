import {Component, OnDestroy, OnInit} from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
    selector: 'pm-product-shell-detail',
    templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {
    pageTitle = 'Product Detail';
    product: IProduct | null;
    private productSubscription: Subscription;

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productSubscription = this.productService.selectedProductChanges$.subscribe((prodSelected) => {
            this.product = prodSelected;
        });
    }

    ngOnDestroy(): void {
        this.productSubscription.unsubscribe();
    }

}
