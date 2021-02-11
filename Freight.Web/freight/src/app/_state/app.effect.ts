import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';

import { AppService } from '../app.service';
import { AppPageActions, AppApiActions } from './actions';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class AppEffects {

  constructor(private actions$: Actions, private appService: AppService, public oidcSecurityService: OidcSecurityService, private notifyService: NotificationsService) { }

  loadBusinesses$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(AppPageActions.loadBusinesses),
        mergeMap((action) => this.appService.getBusinessList(action.userID)
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

  setCurrentBusiness$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(AppPageActions.setCurrentBusiness),
        map(action => {
          return this.notifyService.success('Success', `Company has been changed`, {timeOut: 4000, clickToClose: true });
        })
      );
  });

}
