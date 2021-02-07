import { createAction, props } from '@ngrx/store';
import { Fee } from 'app/_shared/model/fee';

export const loadFeesListSuccess = createAction(
  '[Fee API] Load Fees List Success',
  props<{ fees: Fee[] }>()
);
export const loadFeesListFailure = createAction(
  '[Fee API] Load Fees List Fail',
  props<{ error: string }>()
);

export const getFeeSuccess = createAction(
  '[Fee API] Get Fee Success',
  props<{ fee: Fee }>()
);
export const getFeeFailure = createAction(
  '[Fee API] Get Fee Fail',
  props<{ error: string }>()
);

export const updateFeeSuccess = createAction(
  '[Fee API] Update Fee Success',
  props<{ fee: Fee }>()
);
export const updateFeeFailure = createAction(
  '[Fee API] Update Fee Fail',
  props<{ error: string }>()
);

export const createFeeSuccess = createAction(
  '[Fee API] Create Fee Success',
  props<{ fee: Fee }>()
);
export const createFeeFailure = createAction(
  '[Fee API] Create Fee Fail',
  props<{ error: string }>()
);

export const deleteFeeSuccess = createAction(
  '[Fee API] Delete Item Success',
  props<{ itemid: any }>()
);
export const deleteFeeFailure = createAction(
  '[Fee API] Delete Item Fail',
  props<{ error: string }>()
);