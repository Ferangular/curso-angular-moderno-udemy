import { AsyncPipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CategoryFilterComponent } from '@features/categories/category-filter/category-filter.component';
import { FooterComponent } from '@layout/footer/footer.component';
import { HeaderComponent } from '@layout/header/header.component';
import HeroComponent from '@layout/hero/hero.component';
import { SpinnerComponent } from '@shared/ui/spinner/spinner.component';
import { filter, of } from 'rxjs';
import { CartStateService } from 'src/app/store/cart-state/cart-state.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HeroComponent,
    CategoryFilterComponent,
    SpinnerComponent,
    FooterComponent,
    AsyncPipe,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  currentRoute = '';
  readonly cart$ = inject(CartStateService).cart$;
  private readonly _router = inject(Router);
o$= of(1,2,3,4,5);
signal = toSignal(this.o$, {
  // initialValue: 0,
  requireSync: true,
  manualCleanup: true, // limpieamos el effect
  rejectErrors: true,
  // equal: () => console.log // util para controlar los valores igulalres
  // injector:
})
e = effect(()=> console.log(`Current value: ${this.signal()}`))

  constructor() {
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects.slice(1);
      });
  }


}
