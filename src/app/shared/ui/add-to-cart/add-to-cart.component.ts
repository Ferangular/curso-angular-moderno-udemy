import {
  ChangeDetectionStrategy,
  Component,
  input, output
} from '@angular/core';

type AddToCartConfig = Record<'text', string>;

const DEFAULT_ADD_TO_CART_TEXT = 'Add to cart';

const defaultConfig: AddToCartConfig = {
  text: DEFAULT_ADD_TO_CART_TEXT,
} as const;

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let  myConfig= config();
    <button (click)="onAddToCart()" class="btn">
      {{ myConfig.text }}
    </button>
  `,
  styleUrl: './add-to-cart.component.scss',
})
export class AddToCartComponent {
  config = input<AddToCartConfig>(defaultConfig, { alias: 'myConfig' });
  addToCartEvent = output()
  onAddToCart(): void {
    this.addToCartEvent.emit();
  }
}
