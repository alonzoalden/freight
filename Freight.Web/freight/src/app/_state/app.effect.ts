import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';

import { AppService } from '../app.service';
import { AppPageActions, AppApiActions } from './actions';

@Injectable()
export class AppEffects {

  constructor(private actions$: Actions, private appService: AppService, public oidcSecurityService: OidcSecurityService) { }

  loadBusinesses$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(AppPageActions.loadBusinesses),
        mergeMap(() => this.appService.getBusinessEntities()
          .pipe(
            map(businesses => AppApiActions.loadBusinessesSuccess({ businesses })),
            catchError(error => of(AppApiActions.loadBusinessesFailure({ error })))
          )
        )
      );
  });

  getTest$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(AppPageActions.getTest),
        concatMap(x => this.appService.getTest(x.token)
          .pipe(
            map(test => AppApiActions.getTestSuccess({ test })),
            catchError(error => of(AppApiActions.getTestFailure({ error })))
          )
        )
      );
  });
}
