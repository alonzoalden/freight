import { createReducer, on } from '@ngrx/store';
import { CustomerApiActions, CustomerPageActions } from './actions';
import { Contact, Customer } from 'app/_shared/model/customer';

export interface CustomerState {
  allCustomers: Customer[];
  selectedCustomer: Customer;
  currentContacts: Contact[];
  selectedContact: Contact;
  isSaving: boolean;
  isLoading: boolean,
  error: string;
}

const initalState: CustomerState = {
  allCustomers: null,
  selectedCustomer: null,
  currentContacts: null,
  selectedContact: null,
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

  on(CustomerPageActions.deleteCustomer, (state, action): CustomerState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(CustomerApiActions.deleteCustomerSuccess, (state, action): CustomerState => {
    return {
      ...state,
      isSaving: false,
      allCustomers: state.allCustomers.filter(contact => contact.customerID !== action.customerid)
    };
  }),
  on(CustomerApiActions.deleteCustomerFailure, (state, action): CustomerState => {
    return {
      ...state,
      isSaving: false,
    };
  }),

  on(CustomerPageActions.loadContactList, (state, action): CustomerState => {
    return {
      ...state,
      isLoading: true,
      error: ''
    };
  }),
  on(CustomerApiActions.loadContactListSuccess, (state, action): CustomerState => {
    return {
      ...state,
      currentContacts: action.contacts,
      isLoading: false,
      error: ''
    };
  }),
  on(CustomerApiActions.loadContactListFailure, (state, action): CustomerState => {
    return {
      ...state,
      currentContacts: null,
      isLoading: false,
      error: action.error
    };
  }),
  on(CustomerPageActions.createContact, (state, action): CustomerState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(CustomerApiActions.createContactSuccess, (state, action): CustomerState => {
    return {
      ...state,
      currentContacts: [action.contact, ...state.currentContacts],
      selectedContact: action.contact,
      isSaving: false,
      error: ''
    };
  }),
  on(CustomerApiActions.createContactFailure, (state, action): CustomerState => {
    return {
      ...state,
      isSaving: false,
      selectedContact: null,
      error: ''
    };
  }),


  on(CustomerPageActions.updateContact, (state, action): CustomerState => {
    return {
      ...state,
      isSaving: true,
      selectedCustomer: action.contact
    };
  }),
  on(CustomerApiActions.updateContactSuccess, (state, action): CustomerState => {
    const index = state.currentContacts.findIndex((x: Contact)=> x.contactID == action.contact.contactID);
    const list = [...state.currentContacts];
    list.splice(index, 1, action.contact);
    return Object.assign({
      isSaving: false,
      currentContacts: list,
      selectedContact: action.contact
    });
  }),
  on(CustomerApiActions.updateContactFailure, (state, action): CustomerState => {
    return {
      ...state,
      isSaving: false,
    };
  }),

  on(CustomerPageActions.setCurrentContact, (state, action): CustomerState => {
    return {
      ...state,
      selectedContact: action.currentContact
    };
  }),
  on(CustomerPageActions.deleteContact, (state, action): CustomerState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(CustomerApiActions.deleteContactSuccess, (state, action): CustomerState => {
    return {
      ...state,
      isSaving: false,
      currentContacts: state.currentContacts.filter(contact => contact.contactID !== action.contactid)
    };
  }),
  on(CustomerApiActions.deleteContactFailure, (state, action): CustomerState => {
    return {
      ...state,
      isSaving: false,
    };
  }),
);
