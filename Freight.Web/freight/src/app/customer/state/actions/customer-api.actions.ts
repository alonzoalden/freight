import { createAction, props } from '@ngrx/store';
import { Contact, Customer } from 'app/_shared/model/customer';

export const loadCustomersListSuccess = createAction(
  '[Customer API] Load Customers List Success',
  props<{ customers: Customer[] }>()
);
export const loadCustomersListFailure = createAction(
  '[Customer API] Load Customers List Fail',
  props<{ error: string }>()
);

export const getCustomerSuccess = createAction(
  '[Customer API] Get Customer Success',
  props<{ customer: Customer }>()
);
export const getCustomerFailure = createAction(
  '[Customer API] Get Customer Fail',
  props<{ error: string }>()
);

export const updateCustomerSuccess = createAction(
  '[Customer API] Update Customer Success',
  props<{ customer: Customer }>()
);
export const updateCustomerFailure = createAction(
  '[Customer API] Update Customer Fail',
  props<{ error: string }>()
);

export const createCustomerSuccess = createAction(
  '[Customer API] Create Customer Success',
  props<{ customer: Customer }>()
);
export const createCustomerFailure = createAction(
  '[Customer API] Create Customer Fail',
  props<{ error: string }>()
);

export const deleteCustomerSuccess = createAction(
  '[Customer API] Delete Item Success',
  props<{ customerid: any }>()
);
export const deleteCustomerFailure = createAction(
  '[Customer API] Delete Item Fail',
  props<{ error: string }>()
);

export const createContactSuccess = createAction(
  '[Customer API] Create Contact Success',
  props<{ contact: Contact }>()
);
export const createContactFailure = createAction(
  '[Customer API] Create Contact Fail',
  props<{ error: string }>()
);

export const updateContactSuccess = createAction(
  '[Customer API] Update Contact Success',
  props<{ contact: Contact }>()
);
export const updateContactFailure = createAction(
  '[Customer API] Update Contact Fail',
  props<{ error: string }>()
);

export const deleteContactSuccess = createAction(
  '[Customer API] Delete Contact Success',
  props<{ contactid: any }>()
);
export const deleteContactFailure = createAction(
  '[Customer API] Delete Contact Fail',
  props<{ error: string }>()
);
export const loadContactListSuccess = createAction(
  '[Customer API] Load Contact List Success',
  props<{ contacts: Contact[] }>()
);
export const loadContactListFailure = createAction(
  '[Customer API] Load Contact List Fail',
  props<{ error: string }>()
);
export const deleteContact = createAction(
  '[Contact Page] Delete Contact',
  props<{ contact: any }>()
);

export const verifyCustomerSuccess = createAction(
  '[Customer API] Verify Customer Success',
  props<{ contacts: Contact[] }>()
);
export const verifyCustomerFailure = createAction(
  '[Customer API] Load Contact List Fail',
  props<{ error: string }>()
);