import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';

import { of } from 'rxjs';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';

import { CustomerService } from '../customer.service';
import { CustomerPageActions, CustomerApiActions } from './actions';
import * as fromCustomer from '../state';


@Injectable()
export class CustomerEffects {

  constructor(private actions$: Actions, private customerService: CustomerService, private store: Store<fromCustomer.State>, private notifyService: NotificationsService) { }

  loadCustomerList$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(CustomerPageActions.loadCustomerList),
        concatMap(action => this.customerService.getCustomerList(action.businessid)
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
  verifyAndCreateCustomer$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(CustomerPageActions.verifyAndCreateCustomer),
        concatMap(action => this.customerService.verifyUserEmail(btoa(action.customer.email))
          .pipe(
            map(() => {
              
              return CustomerPageActions.createCustomer({ customer: action.customer });
            }),
            catchError(error => {
              //CustomerPageActions.createCustomer({ customer: action.customer });

              this.store.dispatch(CustomerPageActions.createCustomer({ customer: action.customer }));
              // this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(CustomerApiActions.verifyCustomerFailure({ error }))
              
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
        concatMap(action => this.customerService.deleteCustomer(action.customer.customerID)
          .pipe(
            map(() => {
              this.notifyService.success('Success', `Customer ${action.customer.customerID} has been deleted.`, { timeOut:3500, clickToClose: true });
              return CustomerApiActions.deleteCustomerSuccess({ customerid: action.customer.customerID });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(CustomerApiActions.deleteCustomerFailure({ error }))
            })
          )
        )
      );
  });

  loadContactList$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(CustomerPageActions.loadContactList),
        concatMap(action => this.customerService.getContactList(action.customerid)
          .pipe(
            map(contacts => CustomerApiActions.loadContactListSuccess({ contacts })),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(CustomerApiActions.loadContactListFailure({ error }))
            })
          )
        )
      );
  });

  createContact$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(CustomerPageActions.createContact),
        concatMap(action => this.customerService.createContact(action.contact)
          .pipe(
            map((contact) => {
              this.notifyService.success('Success', `${contact.email} has been created.`, { timeOut:3500, clickToClose: true });
              return CustomerApiActions.createContactSuccess({ contact });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(CustomerApiActions.createContactFailure({ error }))
            })
          )
        )
      );
  });

  updateContact$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(CustomerPageActions.updateContact),
        concatMap(action => this.customerService.updateContact(action.contact)
          .pipe(
            map((contact) => {
              this.notifyService.success('Success', `${contact.email} has been updated.`, { timeOut:3500, clickToClose: true });
              return CustomerApiActions.updateContactSuccess({ contact });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(CustomerApiActions.updateContactFailure({ error }))
            })
          )
        )
      );
  });

  deleteContact$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(CustomerPageActions.deleteContact),
        concatMap(action => this.customerService.deleteContact(action.contact.contactID)
          .pipe(
            map(() => {
              this.notifyService.success('Success', `Contact ${action.contact.email} has been deleted.`, { timeOut:3500, clickToClose: true });
              return CustomerApiActions.deleteContactSuccess({ contactid: action.contact.contactID });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(CustomerApiActions.deleteContactFailure({ error }))
            })
          )
        )
      );
  });
  
}
