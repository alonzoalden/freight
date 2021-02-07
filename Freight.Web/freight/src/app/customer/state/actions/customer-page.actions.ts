import { createAction, props } from '@ngrx/store';
import { Customer } from 'app/_shared/model/customer';

export const loadCustomerList = createAction(
  '[Customer Page] Load Customer List'
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
export const deleteCustomer = createAction(
  '[Customer Page] Delete Customer',
  props<{ customerid: any }>()
);