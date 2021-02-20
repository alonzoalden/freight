import { createAction, props } from '@ngrx/store';
import { Contact, Customer } from 'app/_shared/model/customer';

export const loadCustomerList = createAction(
  '[Customer Page] Load Customer List',
  props<{ businessid: any }>()
);
export const getCustomer = createAction(
  '[Customer Page] Get Customer',
  props<{ customer: Customer }>()
);
export const updateCustomer = createAction(
  '[Customer Page] Update Customer',
  props<{ customer: Customer }>()
);
export const createCustomer = createAction(
  '[Customer Page] Create Customer',
  props<{ customer: Customer }>()
);
export const setCurrentCustomer = createAction(
  '[Customer Page] Set Current Customer',
  props<{ currentCustomer: Customer }>()
);
export const setCurrentContact = createAction(
  '[Customer Page] Set Current Customer',
  props<{ currentContact: Contact }>()
);
export const deleteCustomer = createAction(
  '[Customer Page] Delete Customer',
  props<{ customer: any }>()
);

export const loadContactList = createAction(
  '[Customer Page] Load Contact List',
  props<{ customerid: any }>()
);

export const createContact = createAction(
  '[Customer Page] Create Contact',
  props<{ contact: any }>()
);
export const updateContact = createAction(
  '[Customer Page] Update Contact',
  props<{ contact: any }>()
);
export const deleteContact = createAction(
  '[Contact Page] Delete Contact',
  props<{ contact: any }>()
);

export const verifyAndCreateCustomer = createAction(
  '[Contact Page] Verify And Create Customer',
  props<{ customer: any }>()
);