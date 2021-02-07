import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationsService } from 'angular2-notifications';

import { of } from 'rxjs';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';

import { CustomerService } from '../customer.service';
import { CustomerPageActions, CustomerApiActions } from './actions';

@Injectable()
export class CustomerEffects {

  constructor(private actions$: Actions, private customerService: CustomerService, private notifyService: NotificationsService) { }

  loadCustomerList$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(CustomerPageActions.loadCustomerList),
        concatMap(action => this.customerService.getAllCustomerList()
          .pipe(
            map(customers => CustomerApiActions.loadCustomersListSuccess({ customers })),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(CustomerApiActions.loadCustomersListFailure({ error }))
            })
          )
        )
      );
  });

  updateCustomer$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(CustomerPageActions.updateCustomer),
        concatMap(action => this.customerService.updateCustomer(action.customer)
          .pipe(
            map((customer) => {
              this.notifyService.success('Success', `${customer.email} has been updated.`, { timeOut:3500, clickToClose: true });
              return CustomerApiActions.updateCustomerSuccess({ customer });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(CustomerApiActions.updateCustomerFailure({ error }))
            })
          )
        )
      );
  });
  createCustomer$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(CustomerPageActions.createCustomer),
        concatMap(action => this.customerService.createCustomer(action.customer)
          .pipe(
            map((customer) => {
              this.notifyService.success('Success', `${customer.email} has been created.`, { timeOut:3500, clickToClose: true });
              return CustomerApiActions.createCustomerSuccess({ customer });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(CustomerApiActions.createCustomerFailure({ error }))
            })
          )
        )
      );
  });
  deleteCustomer$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(CustomerPageActions.deleteCustomer),
        concatMap(action => this.customerService.deleteCustomer(action.customerid)
          .pipe(
            map((customer) => {
              this.notifyService.success('Success', `Customer ${action.customerid} has been deleted.`, { timeOut:3500, clickToClose: true });
              return CustomerApiActions.createCustomerSuccess({ customer });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(CustomerApiActions.createCustomerFailure({ error }))
            })
          )
        )
      );
  });
}
