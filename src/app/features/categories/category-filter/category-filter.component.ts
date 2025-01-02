import { AsyncPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '@features/categories/categories.service';
import { CategoryButtonComponent } from '@features/categories/category-button/category-button.component';
import { ProductsService } from '@features/products/products.service';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [AsyncPipe, CategoryButtonComponent],
  styleUrl: './category-filter.component.scss',
  template: `
    <h2 class="heading">
      <span class="highlight">Popular</span>
      categories
    </h2>
    <ul class="list-container">

      <!-- TODO: Can be an  component -->
      <li>
        <app-category-button      category="ALL" [(filterCategory)]="selectedCategory"  ></app-category-button>
      </li>
      <!-- TODO: Can be an  component -->
      @for(category of categories(); track category){
      <li>
        <app-category-button [category]="category" [(filterCategory)]="selectedCategory"  ></app-category-button>
      </li>
      }
    </ul>
  `,
})
export class CategoryFilterComponent {
  readonly categories = inject(CategoryService).categories;

  private readonly _productService = inject(ProductsService);

  selectedCategory = signal<string>('all');


  constructor() {
    effect(
      () =>
        this._productService.filterProductsByCategory(this.selectedCategory()),
      {
        allowSignalWrites: true, //angular 19 ya no es necesario
      }
    );
  }

  // onClick(category: string): void {
  //   this._router.navigate([], {
  //     queryParams: { category: category === 'all' ? null : category },
  //     queryParamsHandling: 'merge',
  //     replaceUrl: true,
  //   });
  // }
}
