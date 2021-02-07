import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAppState from '../../_state';
import { FeeState } from './fee.reducer';
import { AppState } from '../../_state/app.reducer';

export interface State extends fromAppState.State {
  fee: FeeState;
}

const getFeeFeatureState = createFeatureSelector<FeeState>('fee');
const getAppFeatureState = createFeatureSelector<AppState>('app');

export const getAllFeeList = createSelector(
  getFeeFeatureState,
  state => state.allFees
);
export const getSelectedFee = createSelector(
  getFeeFeatureState,
  state => state.selectedFee
);
export const getIsSaving = createSelector(
  getFeeFeatureState,
  state => state.isSaving
);
export const getIsLoading = createSelector(
  getFeeFeatureState,
  state => state.isLoading
);
