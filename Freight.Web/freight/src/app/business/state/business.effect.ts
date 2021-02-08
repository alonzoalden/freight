import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationsService } from 'angular2-notifications';

import { of } from 'rxjs';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';

import { BusinessService } from '../business.service';
import { BusinessPageActions, BusinessApiActions } from './actions';

@Injectable()
export class BusinessEffects {

  constructor(private actions$: Actions, private businessService: BusinessService, private notifyService: NotificationsService) { }

  loadBusinessList$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BusinessPageActions.loadBusinessList),
        concatMap(action => this.businessService.getAllBusinessList()
          .pipe(
            map(businesss => BusinessApiActions.loadBusinesssListSuccess({ businesss })),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(BusinessApiActions.loadBusinesssListFailure({ error }))
            })
          )
        )
      );
  });

  updateBusiness$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BusinessPageActions.updateBusiness),
        concatMap(action => this.businessService.updateBusiness(action.business)
          .pipe(
            map((business) => {
              this.notifyService.success('Success', `${business.businessName} has been updated.`, { timeOut:3500, clickToClose: true });
              return BusinessApiActions.updateBusinessSuccess({ business });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(BusinessApiActions.updateBusinessFailure({ error }))
            })
          )
        )
      );
  });
  createBusiness$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BusinessPageActions.createBusiness),
        concatMap(action => this.businessService.createBusiness(action.business)
          .pipe(
            map((business) => {
              this.notifyService.success('Success', `${business.businessName} has been updated.`, { timeOut:3500, clickToClose: true });
              return BusinessApiActions.createBusinessSuccess({ business });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(BusinessApiActions.createBusinessFailure({ error }))
            })
          )
        )
      );
  });
  deleteBusiness$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BusinessPageActions.deleteBusiness),
        concatMap(action => this.businessService.deleteBusiness(action.businessid)
          .pipe(
            map((fee) => {
              this.notifyService.success('Success', `Fee ${action.businessid} has been deleted.`, { timeOut:3500, clickToClose: true });
              return BusinessApiActions.deleteBusinessSuccess({ businessid: action.businessid });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(BusinessApiActions.deleteBusinessFailure({ error }))
            })
          )
        )
      );
  });
}
