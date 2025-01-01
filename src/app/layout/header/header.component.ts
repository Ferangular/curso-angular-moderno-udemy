import { CurrencyPipe, NgClass,   SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartStore } from 'src/app/store/cart-state/cart-state.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, SlicePipe, CurrencyPipe, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  cart = input.required<CartStore | null>();
  showCart = false;
  protected readonly catchError = catchError;
}
