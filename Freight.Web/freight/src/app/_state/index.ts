import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';

export interface State {
  app: AppState;
}

const getAppFeatureState = createFeatureSelector<AppState>('app');

export const getBusinessEntities = createSelector(
  getAppFeatureState,
  state => state.businesses
);

export const getCurrentBusinessEntityId = createSelector(
  getAppFeatureState,
  state => state.currentBusinessEntityId
);
export const getCurrentBusiness = createSelector(
  getAppFeatureState,
  state => state.currentBusiness
);

export const getCurrentUser = createSelector(
  getAppFeatureState,
  state => state.currentUser
);


export const getTest = createSelector(
  getAppFeatureState,
  state => state.test
);
