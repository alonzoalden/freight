import { createReducer, on } from '@ngrx/store';
import { AppPageActions, AppApiActions } from './actions';

import { BusinessEntity } from '../_shared/model/business-entity';
import { Business } from 'app/_shared/model/business';

export interface AppState {
  businesses: Business[];
  currentBusinessEntityId: number | null;
  currentUser: any;
  error: string;
  test: string;
}

const initalState: AppState = {
  businesses: [],
  currentBusinessEntityId: null,
  currentUser: null,
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
  on(AppPageActions.setCurrentUser, (state, action): AppState => {
    return {
      ...state,
      currentUser: action.user
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
