import { inject, Injectable, signal } from '@angular/core';
import { APIService } from '@api/api.service';
import { environment } from '@envs/environment';
import { tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  // readonly categories$ = new BehaviorSubject<string[]>([]);
  readonly categories = signal<string[]>([]);
  //  categories$ = toObservable(this.categories);
  private readonly _endPoint = `${environment.API_URL_FAKE_STORE}/products/categories`;
  private readonly _apiService = inject(APIService);

  constructor() {
    this._getCategories();
  }

  private _getCategories(): void {
    this._apiService
      .get<string[]>(this._endPoint)
      .pipe(tap((categories: string[]) => this.categories.set(categories)))
      .subscribe();
  }
}
