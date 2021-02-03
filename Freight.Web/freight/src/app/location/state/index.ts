import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAppState from '../../_state';
import { LocationState } from './location.reducer';
import { AppState } from '../../_state/app.reducer';

export interface State extends fromAppState.State {
  location: LocationState;
}

const getLocationFeatureState = createFeatureSelector<LocationState>('location');
const getAppFeatureState = createFeatureSelector<AppState>('app');

export const getAllLocationList = createSelector(
  getLocationFeatureState,
  state => state.allLocations
);
export const getSelectedLocation = createSelector(
  getLocationFeatureState,
  state => state.selectedLocation
);
export const getIsSaving = createSelector(
  getLocationFeatureState,
  state => state.isSaving
);
export const getIsLoading = createSelector(
  getLocationFeatureState,
  state => state.isLoading
);
