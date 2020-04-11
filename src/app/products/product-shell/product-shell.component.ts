import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Subject} from 'rxjs/internal/Subject';
import {IProduct} from '../product';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
    templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit, OnDestroy {
    pageTitle = 'Products';
    monthCount: number;
    private productSubscription: Subscription;

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productSubscription = this.productService.selectedProductChanges$.subscribe(product => {
            if (product) {
                const now = new Date();
                const released = new Date(product.releaseDate);
                this.monthCount = now.getMonth() - released.getMonth() + (12 * (now.getFullYear() - released.getFullYear()));
            } else {
                this.monthCount = 0;
            }
        });
    }

    ngOnDestroy(): void {
        this.productSubscription.unsubscribe();
    }

}
