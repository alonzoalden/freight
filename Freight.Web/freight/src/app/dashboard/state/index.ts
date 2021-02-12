import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAppState from '../../_state';
import { DashboardState } from './dashboard.reducer';
import { AppState } from '../../_state/app.reducer';

export interface State extends fromAppState.State {
  dashboard: DashboardState;
}

const getDashboardFeatureState = createFeatureSelector<DashboardState>('dashboard');
const getAppFeatureState = createFeatureSelector<AppState>('app');

export const getBusinessEntities = createSelector(
  getAppFeatureState,
  state => state.businesses
);

export const getCurrentBusinessEntityId = createSelector(
  getAppFeatureState,
  state => state.currentBusinessEntityId
);

export const getCurrentBusinessEntity = createSelector(
  getAppFeatureState,
  getCurrentBusinessEntityId,
  (state, currentBusinessEntityId) => {
    return currentBusinessEntityId ? state.businesses.find(b => b.businessID === currentBusinessEntityId) : null;
  }
);

export const selectedBussiness = createSelector(
  getAppFeatureState,
  state => state.currentBusinessEntityId !== null
);

export const getBusinessAccesses = createSelector(
  getDashboardFeatureState,
  state => state.access
);

export const getDashboardInfo = createSelector(
  getDashboardFeatureState,
  state => state.dashboardInfo
);


