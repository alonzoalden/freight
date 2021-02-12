import { createReducer, on } from '@ngrx/store';
import { FeeApiActions, FeePageActions } from './actions';
import { Fee } from 'app/_shared/model/fee';

export interface FeeState {
  allFees: Fee[];
  selectedFee: Fee;
  isSaving: boolean;
  isLoading: boolean,
  error: string;
}

const initalState: FeeState = {
  allFees: null,
  selectedFee: null,
  isSaving: false,
  isLoading: false,
  error: ''
};

export const feeReducer = createReducer<FeeState>(
  initalState,
  on(FeePageActions.loadFeeList, (state, action): FeeState => {
    return {
      ...state,
      isLoading: true,
      error: ''
    };
  }),
  on(FeeApiActions.loadFeesListSuccess, (state, action): FeeState => {
    return {
      ...state,
      allFees: action.fees,
      isLoading: false,
      error: ''
    };
  }),
  on(FeeApiActions.loadFeesListFailure, (state, action): FeeState => {
    return {
      ...state,
      allFees: null,
      isLoading: false,
      error: action.error
    };
  }),
  on(FeePageActions.createFee, (state, action): FeeState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(FeeApiActions.createFeeSuccess, (state, action): FeeState => {
    return {
      ...state,
      allFees: [action.fee, ...state.allFees],
      selectedFee: action.fee,
      isSaving: false,
      error: ''
    };
  }),
  on(FeeApiActions.createFeeFailure, (state, action): FeeState => {
    return {
      ...state,
      isSaving: false,
      selectedFee: null,
      error: ''
    };
  }),
  on(FeeApiActions.loadFeesListFailure, (state, action): FeeState => {
    return {
      ...state,
      allFees: null,
      isLoading: false,
      error: action.error
    };
  }),
  on(FeePageActions.setCurrentFee, (state, action): FeeState => {
    return {
      ...state,
      selectedFee: action.currentFee
    };
  }),
  on(FeePageActions.updateFee, (state, action): FeeState => {
    return {
      ...state,
      isSaving: true,
      selectedFee: action.fee
    };
  }),
  on(FeeApiActions.updateFeeSuccess, (state, action): FeeState => {
    const index = state.allFees.findIndex((x)=> x.feeID == action.fee.feeID);
    const list = [...state.allFees];
    list.splice(index, 1, action.fee);
    return Object.assign({
      isSaving: false,
      allFees: list,
      selectedFee: action.fee
    });
  }),
  on(FeeApiActions.updateFeeFailure, (state, action): FeeState => {
    return {
      ...state,
      isSaving: false,
    };
  }),
  on(FeePageActions.deleteFee, (state, action): FeeState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(FeeApiActions.deleteFeeSuccess, (state, action): FeeState => {
    return {
      ...state,
      isSaving: false,
      allFees: state.allFees.filter(item => item.feeID !== action.feeID)
    };
  }),
  on(FeeApiActions.deleteFeeFailure, (state, action): FeeState => {
    return {
      ...state,
      isSaving: false,
    };
  }),
);
