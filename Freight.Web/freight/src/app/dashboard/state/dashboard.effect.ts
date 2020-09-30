import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';

import { DashboardService } from '../dashboard.service';
import { DashboardPageActions, DashboardApiActions } from './actions';

@Injectable()
export class DashboardEffects {

  constructor(private actions$: Actions, private dashboardService: DashboardService) { }

  loadBusinessAccesses$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(DashboardPageActions.loadBusinessAccess),
        concatMap(action => this.dashboardService.getBusinessAccess(action.id)
          .pipe(
            map(access => DashboardApiActions.loadBusinessAccessSuccess({ access })),
            catchError(error => of(DashboardApiActions.loadBusinessAccessFailure({ error })))
          )
        )
      );
  });
}
