import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import {NgModel} from '@angular/forms';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle = 'Product List';
    @ViewChild('filterElement') filterElementRef;
    // @ViewChildren('filterElement, nameElement') inputElementsRef: QueryList<ElementRef>;
    // @ViewChildren(NgModel) inputElementsRef: QueryList<NgModel>;
    listFilter: string;
    filterName: string;
    showImage: boolean;

    imageWidth = 50;
    imageMargin = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];

    constructor(private productService: ProductService) {
    }

    ngAfterViewInit(): void {
        // console.log(this.inputElementsRef);
        this.filterElementRef.nativeElement.focus();
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.listFilter);
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

    onFilterChange(filter: string) {
        this.listFilter = filter;
        this.performFilter(this.listFilter);
    }
}
