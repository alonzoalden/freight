import { createReducer, on } from '@ngrx/store';
import { DashboardApiActions, DashboardPageActions } from './actions';

import { BusinessEntity } from '../../_shared/model/business-entity';
import { BusinessAccess } from 'app/_shared/model/business-access';

export interface DashboardState {
  access: BusinessAccess;
  dashboardInfo: any;
  isLoading: boolean;
  error: string;
}

const initalState: DashboardState = {
  access: null,
  dashboardInfo: null,
  isLoading: false,
  error: ''
};

export const dashboardReducer = createReducer<DashboardState>(
  initalState,
  on(DashboardApiActions.loadBusinessAccessSuccess, (state, action): DashboardState => {
    return {
      ...state,
      access: action.access,
      error: ''
    };
  }),
  on(DashboardApiActions.loadBusinessAccessFailure, (state, action): DashboardState => {
    return {
      ...state,
      access: null,
      error: action.error
    };
  }),
  on(DashboardPageActions.loadDashboardInfo, (state, action): DashboardState => {
    return {
      ...state,
      isLoading: true,
      error: ''
    };
  }),
  on(DashboardApiActions.loadDashboardInfoSuccess, (state, action): DashboardState => {
    return {
      ...state,
      dashboardInfo: action.dashboardInfo,
      isLoading: false,
    };
  }),
  on(DashboardApiActions.loadDashboardInfoFailure, (state, action): DashboardState => {
    return {
      ...state,
      dashboardInfo: null,
      isLoading: false,
    };
  })
  
);
