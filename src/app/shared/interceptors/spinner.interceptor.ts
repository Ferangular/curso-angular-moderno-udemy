import { inject } from '@angular/core';
import { SpinnerService } from '@shared/services/spinner.service';
import { finalize } from 'rxjs';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor, HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const SpinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);
  spinnerService.show();
  return next(req).pipe(finalize(() => spinnerService.hide()));
}
