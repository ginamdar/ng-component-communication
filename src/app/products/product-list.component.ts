import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import {CriteriaComponent} from '../shared/criteria/criteria.component';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle = 'Product List';
    // @ViewChildren('filterElement, nameElement') inputElementsRef: QueryList<ElementRef>;
    // @ViewChildren(NgModel) inputElementsRef: QueryList<NgModel>;
    @ViewChild('filterCriteria') filterComponent: CriteriaComponent;
    parentListFilter: string;
    showImage: boolean;
    showFilter = true;

    imageWidth = 50;
    imageMargin = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];

    constructor(private productService: ProductService) {
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.parentListFilter);
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

    ngAfterViewInit(): void {
        this.parentListFilter = this.filterComponent.listFilter;
    }

    onValueChange(value: string): void {
        this.performFilter(value);
    }
}
