import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAppState from '../../_state';
import { BusinessState } from './business.reducer';
import { AppState } from '../../_state/app.reducer';

export interface State extends fromAppState.State {
  business: BusinessState;
}

const getBusinessFeatureState = createFeatureSelector<BusinessState>('business');
const getAppFeatureState = createFeatureSelector<AppState>('app');

export const getAllBusinessList = createSelector(
  getBusinessFeatureState,
  state => state.allBusinesss
);
export const getSelectedBusiness = createSelector(
  getBusinessFeatureState,
  state => state.selectedBusiness
);
export const getIsSaving = createSelector(
  getBusinessFeatureState,
  state => state.isSaving
);
export const getIsLoading = createSelector(
  getBusinessFeatureState,
  state => state.isLoading
);
