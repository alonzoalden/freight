import { createReducer, on } from '@ngrx/store';
import { DashboardApiActions } from './actions';

import { BusinessEntity } from '../../_shared/model/business-entity';
import { BusinessAccess } from 'src/app/_shared/model/business-access';

export interface DashboardState {
  access: BusinessAccess;
  error: string;
}

const initalState: DashboardState = {
  access: null,
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
);
