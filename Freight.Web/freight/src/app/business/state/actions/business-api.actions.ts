import { createAction, props } from '@ngrx/store';
import { Business } from 'app/_shared/model/business';

export const loadBusinesssListSuccess = createAction(
  '[Business API] Load Businesss List Success',
  props<{ businesss: Business[] }>()
);
export const loadBusinesssListFailure = createAction(
  '[Business API] Load Businesss List Fail',
  props<{ error: string }>()
);

export const getBusinessSuccess = createAction(
  '[Business API] Get Business Success',
  props<{ business: Business }>()
);
export const getBusinessFailure = createAction(
  '[Business API] Get Business Fail',
  props<{ error: string }>()
);

export const updateBusinessSuccess = createAction(
  '[Business API] Update Business Success',
  props<{ business: Business }>()
);
export const updateBusinessFailure = createAction(
  '[Business API] Update Business Fail',
  props<{ error: string }>()
);

export const createBusinessSuccess = createAction(
  '[Business API] Create Business Success',
  props<{ business: Business }>()
);
export const createBusinessFailure = createAction(
  '[Business API] Create Business Fail',
  props<{ error: string }>()
);
export const deleteBusinessSuccess = createAction(
  '[Business API] Delete Business Success',
  props<{ businessid: any }>()
);
export const deleteBusinessFailure = createAction(
  '[Business API] Delete Business Fail',
  props<{ error: string }>()
);