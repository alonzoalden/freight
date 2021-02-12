import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationsService } from 'angular2-notifications';

import { of } from 'rxjs';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';

import { FeeService } from '../fee.service';
import { FeePageActions, FeeApiActions } from './actions';

@Injectable()
export class FeeEffects {

  constructor(private actions$: Actions, private feeService: FeeService, private notifyService: NotificationsService) { }

  loadFeeList$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(FeePageActions.loadFeeList),
        concatMap(action => this.feeService.getFeeList(action.businessid)
          .pipe(
            map(fees => FeeApiActions.loadFeesListSuccess({ fees })),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(FeeApiActions.loadFeesListFailure({ error }))
            })
          )
        )
      );
  });

  updateFee$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(FeePageActions.updateFee),
        concatMap(action => this.feeService.updateFee(action.fee)
          .pipe(
            map((fee) => {
              this.notifyService.success('Success', `${fee.feeType} has been updated.`, { timeOut:3500, clickToClose: true });
              return FeeApiActions.updateFeeSuccess({ fee });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(FeeApiActions.updateFeeFailure({ error }))
            })
          )
        )
      );
  });
  createFee$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(FeePageActions.createFee),
        concatMap(action => this.feeService.createFee(action.fee)
          .pipe(
            map((fee) => {
              this.notifyService.success('Success', `${fee.feeType} has been created.`, { timeOut:3500, clickToClose: true });
              return FeeApiActions.createFeeSuccess({ fee });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(FeeApiActions.createFeeFailure({ error }))
            })
          )
        )
      );
  });
  deleteFee$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(FeePageActions.deleteFee),
        concatMap(action => this.feeService.deleteFee(action.feeid)
          .pipe(
            map((fee) => {
              this.notifyService.success('Success', `Fee ${action.feeid} has been deleted.`, { timeOut:3500, clickToClose: true });
              return FeeApiActions.deleteFeeSuccess({ feeID: action.feeid });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(FeeApiActions.deleteFeeFailure({ error }))
            })
          )
        )
      );
  });
}
