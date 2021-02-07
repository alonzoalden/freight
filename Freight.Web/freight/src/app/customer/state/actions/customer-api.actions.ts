import { createAction, props } from '@ngrx/store';
import { Customer } from 'app/_shared/model/customer';

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
  props<{ itemid: any }>()
);
export const deleteCustomerFailure = createAction(
  '[Customer API] Delete Item Fail',
  props<{ error: string }>()
);