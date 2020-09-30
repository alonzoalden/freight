import { createReducer, on } from '@ngrx/store';
import { AppPageActions, AppApiActions } from './actions';

import { BusinessEntity } from '../_shared/model/business-entity';

export interface AppState {
  businesses: BusinessEntity[];
  currentBusinessEntityId: number | null;
  error: string;
  test: string;
}

const initalState: AppState = {
  businesses: [],
  currentBusinessEntityId: null,
  error: '',
  test: ''
};

export const appReducer = createReducer<AppState>(
  initalState,
  on(AppApiActions.loadBusinessesSuccess, (state, action): AppState => {
    return {
      ...state,
      businesses: action.businesses,
      error: ''
    };
  }),
  on(AppApiActions.loadBusinessesFailure, (state, action): AppState => {
    return {
      ...state,
      businesses: [],
      error: action.error
    };
  }),
  on(AppPageActions.setCurrentBusiness, (state, action): AppState => {
    return {
      ...state,
      currentBusinessEntityId: action.currentBusinessId
    };
  }),
  on(AppPageActions.clearCurrentBusiness, (state): AppState => {
    return {
      ...state,
      currentBusinessEntityId: null
    };
  }),
  on(AppApiActions.getTestSuccess, (state, action): AppState => {
    return {
      ...state,
      test: action.test
    };
  }),
  on(AppApiActions.getTestFailure, (state, action): AppState => {
    return {
      ...state,
      test: 'ERRORED',
      error: action.error
    };
  })
);
