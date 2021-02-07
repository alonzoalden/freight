import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAppState from '../../_state';
import { CustomerState } from './customer.reducer';
import { AppState } from '../../_state/app.reducer';

export interface State extends fromAppState.State {
  customer: CustomerState;
}

const getcustomerFeatureState = createFeatureSelector<CustomerState>('customer');
const getAppFeatureState = createFeatureSelector<AppState>('app');

export const getAllcustomerList = createSelector(
  getcustomerFeatureState,
  state => state.allCustomers
);
export const getSelectedcustomer = createSelector(
  getcustomerFeatureState,
  state => state.selectedCustomer
);
export const getIsSaving = createSelector(
  getcustomerFeatureState,
  state => state.isSaving
);
export const getIsLoading = createSelector(
  getcustomerFeatureState,
  state => state.isLoading
);
