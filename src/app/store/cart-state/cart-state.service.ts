import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Product } from '@features/products/product.interface';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { CartCalculatorService } from 'src/app/store/cart-state/cart-calculator.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { CartStorageService } from './cart-storage.service';

export interface CartStore {
  products: Product[];
  totalAmount: number;
  productsCount: number;
}

export const initialCartState: CartStore = {
  products: [],
  totalAmount: 0,
  productsCount: 0,
};

@Injectable({ providedIn: 'root' })
export class CartStateService {
  private readonly _cartCalculatorService = inject(CartCalculatorService);
  private readonly _toastrService = inject(ToastrService);
  private readonly _cartStorageService = inject(CartStorageService);
  private readonly _product = signal<Product[]>([]);
  readonly totalAmount = computed( ()=> this._cartCalculatorService.calculateTotal(this._product()));
  readonly productsCount = computed( ()=> this._cartCalculatorService.calculateItemsCount(this._product()));
 readonly cartStore = computed( ()=> ({
   products: this._product(),
   totalAmount: this.totalAmount(),
   productsCount: this.productsCount()
 }))

constructor() {
   const saveState = this._cartStorageService.loadState();
   if(saveState){
    this._product.set(saveState.products);
   }
  effect(() => {this._cartStorageService.saveState(this.cartStore());
  });
}

 addToCart(product: Product): void {
    console.log(product);
    const currentProducts = this._product();
        const existingProductIndex = currentProducts.findIndex(
      (p: Product) => p.id === product.id
    );
    if (existingProductIndex >= 0) {
      currentProducts[existingProductIndex] = {
        ...product,
        quantity: (currentProducts[existingProductIndex].quantity || 0) + 1,
      };
      this._product.set(currentProducts);
    } else {
      this._product.update((products: Product[]) =>
      [...products, { ...product, quantity: 1 }]
      );
    }
 console.log(this._product());
    this._toastrService.success('Product added!!', 'DOMINI STORE');
  }

  removeFromCart(productId: number): void {
    try {
      if (!productId) {
        throw new Error('Product id is required');
      }
      const currentProducts = this._product();
      const productExists = currentProducts.some((product: Product) => product.id === productId);
      if(!productExists){
        this._toastrService.warning('Product not found');
        return;
      }
      this._product.update((products)=> products.filter((product)=> product.id !== productId))
      this._toastrService.success('Product removed!!', 'DOMINI STORE');
    }catch (error) {
        console.error('Error removing product',error);
        this._toastrService.error('Error removing product', 'DOMINI STORE');
      }
  }

  clearCart(): void {
    this._product.set([]);
    this._toastrService.success('All Products removed!', 'DOMINI STORE');
  }
}
