import { createReducer, on } from '@ngrx/store';
import { BusinessApiActions, BusinessPageActions } from './actions';
import { Business } from 'app/_shared/model/business';

export interface BusinessState {
  allBusinesss: Business[];
  selectedBusiness: Business;
  isSaving: boolean;
  isLoading: boolean,
  error: string;
}

const initalState: BusinessState = {
  allBusinesss: null,
  selectedBusiness: null,
  isSaving: false,
  isLoading: false,
  error: ''
};

export const businessReducer = createReducer<BusinessState>(
  initalState,
  on(BusinessPageActions.loadBusinessList, (state, action): BusinessState => {
    return {
      ...state,
      isLoading: true,
      error: ''
    };
  }),
  on(BusinessApiActions.loadBusinesssListSuccess, (state, action): BusinessState => {
    return {
      ...state,
      allBusinesss: action.businesss,
      isLoading: false,
      error: ''
    };
  }),
  on(BusinessApiActions.loadBusinesssListFailure, (state, action): BusinessState => {
    return {
      ...state,
      allBusinesss: null,
      isLoading: false,
      error: action.error
    };
  }),
  on(BusinessPageActions.createBusiness, (state, action): BusinessState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(BusinessApiActions.createBusinessSuccess, (state, action): BusinessState => {
    return {
      ...state,
      allBusinesss: [action.business, ...state.allBusinesss],
      selectedBusiness: action.business,
      isSaving: false,
      error: ''
    };
  }),
  on(BusinessApiActions.createBusinessFailure, (state, action): BusinessState => {
    return {
      ...state,
      isSaving: false,
      selectedBusiness: null,
      error: ''
    };
  }),
  on(BusinessApiActions.loadBusinesssListFailure, (state, action): BusinessState => {
    return {
      ...state,
      allBusinesss: null,
      isLoading: false,
      error: action.error
    };
  }),
  on(BusinessPageActions.setCurrentBusiness, (state, action): BusinessState => {
    return {
      ...state,
      selectedBusiness: action.currentBusiness
    };
  }),
  on(BusinessPageActions.updateBusiness, (state, action): BusinessState => {
    return {
      ...state,
      isSaving: true,
      selectedBusiness: action.business
    };
  }),
  on(BusinessApiActions.updateBusinessSuccess, (state, action): BusinessState => {
    const index = state.allBusinesss.findIndex((x)=> x.businessID == action.business.businessID);
    const list = [...state.allBusinesss];
    list.splice(index, 1, action.business);
    return Object.assign({
      isSaving: false,
      allBusinesss: list,
      selectedBusiness: action.business
    });
  }),
  on(BusinessApiActions.updateBusinessFailure, (state, action): BusinessState => {
    return {
      ...state,
      isSaving: false,
    };
  }),
);
