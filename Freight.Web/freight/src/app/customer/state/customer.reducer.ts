import { createReducer, on } from '@ngrx/store';
import { CustomerApiActions, CustomerPageActions } from './actions';
import { Customer } from 'app/_shared/model/customer';

export interface CustomerState {
  allCustomers: Customer[];
  selectedCustomer: Customer;
  isSaving: boolean;
  isLoading: boolean,
  error: string;
}

const initalState: CustomerState = {
  allCustomers: null,
  selectedCustomer: null,
  isSaving: false,
  isLoading: false,
  error: ''
};

export const customerReducer = createReducer<CustomerState>(
  initalState,
  on(CustomerPageActions.loadCustomerList, (state, action): CustomerState => {
    return {
      ...state,
      isLoading: true,
      error: ''
    };
  }),
  on(CustomerApiActions.loadCustomersListSuccess, (state, action): CustomerState => {
    return {
      ...state,
      allCustomers: action.customers,
      isLoading: false,
      error: ''
    };
  }),
  on(CustomerApiActions.loadCustomersListFailure, (state, action): CustomerState => {
    return {
      ...state,
      allCustomers: null,
      isLoading: false,
      error: action.error
    };
  }),
  on(CustomerPageActions.createCustomer, (state, action): CustomerState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(CustomerApiActions.createCustomerSuccess, (state, action): CustomerState => {
    return {
      ...state,
      allCustomers: [action.customer, ...state.allCustomers],
      selectedCustomer: action.customer,
      isSaving: false,
      error: ''
    };
  }),
  on(CustomerApiActions.createCustomerFailure, (state, action): CustomerState => {
    return {
      ...state,
      isSaving: false,
      selectedCustomer: null,
      error: ''
    };
  }),
  on(CustomerApiActions.loadCustomersListFailure, (state, action): CustomerState => {
    return {
      ...state,
      allCustomers: null,
      isLoading: false,
      error: action.error
    };
  }),
  on(CustomerPageActions.setCurrentCustomer, (state, action): CustomerState => {
    return {
      ...state,
      selectedCustomer: action.currentCustomer
    };
  }),
  on(CustomerPageActions.updateCustomer, (state, action): CustomerState => {
    return {
      ...state,
      isSaving: true,
      selectedCustomer: action.customer
    };
  }),
  on(CustomerApiActions.updateCustomerSuccess, (state, action): CustomerState => {
    const index = state.allCustomers.findIndex((x)=> x.customerID == action.customer.customerID);
    const list = [...state.allCustomers];
    list.splice(index, 1, action.customer);
    return Object.assign({
      isSaving: false,
      allCustomers: list,
      selectedCustomer: action.customer
    });
  }),
  on(CustomerApiActions.updateCustomerFailure, (state, action): CustomerState => {
    return {
      ...state,
      isSaving: false,
    };
  }),
  
);
