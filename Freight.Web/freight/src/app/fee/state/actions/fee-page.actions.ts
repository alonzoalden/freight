import { createAction, props } from '@ngrx/store';
import { Fee } from 'app/_shared/model/fee';

export const loadFeeList = createAction(
  '[Fee Page] Load Fee List'
);
export const getFee = createAction(
  '[Fee Page] Get Fee',
  props<{ fee: Fee }>()
);
export const updateFee = createAction(
  '[Fee Page] Update Fee',
  props<{ fee: Fee }>()
);
export const createFee = createAction(
  '[Fee Page] Create Fee',
  props<{ fee: Fee }>()
);
export const setCurrentFee = createAction(
  '[Fee Page] Set Current Fee',
  props<{ currentFee: Fee }>()
);
export const deleteFee = createAction(
  '[Fee Page] Delete Fee',
  props<{ feeid: any }>()
);