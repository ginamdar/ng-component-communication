import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import {CriteriaComponent} from '../shared/criteria/criteria.component';
import {ProductParameterService} from './product-parameter.service';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
    pageTitle = 'Product List';
    // @ViewChildren('filterElement, nameElement') inputElementsRef: QueryList<ElementRef>;
    // @ViewChildren(NgModel) inputElementsRef: QueryList<NgModel>;
    @ViewChild('filterCriteria') filterComponent: CriteriaComponent;
    private productsSubscriber: Subscription;
    showFilter = true;

    imageWidth = 50;
    imageMargin = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];

    get showImage(): boolean {
        return this.productParameterService.showImage;
    }
    set showImage(value: boolean) {
        this.productParameterService.showImage = value;
    }

    constructor(private productService: ProductService,
                private productParameterService: ProductParameterService) {
    }

    ngOnInit(): void {
        this.productsSubscriber = this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                if (this.filterComponent) {
                    this.filterComponent.listFilter = this.productParameterService.filterBy;
                    this.performFilter(this.filterComponent.listFilter);
                } else {
                    this.performFilter();
                }
            },
            (error: any) => this.errorMessage = error as any
        );
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }

    onValueChange(value: string): void {
        this.productParameterService.filterBy = value;
        this.performFilter(value);
    }

    ngOnDestroy(): void {
        this.productsSubscriber?.unsubscribe();
    }
}
