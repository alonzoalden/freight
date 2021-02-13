import { createAction, props } from '@ngrx/store';
import { Business } from 'app/_shared/model/business';

export const loadBusinessList = createAction(
  '[Business Page] Load Business List',
  props<{ userid: any }>()
);

export const getBusiness = createAction(
  '[Business Page] Get Business',
  props<{ business: Business }>()
);
export const updateBusiness = createAction(
  '[Business Page] Update Business',
  props<{ business: Business }>()
);
export const createBusiness = createAction(
  '[Business Page] Create Business',
  props<{ business: Business }>()
);
export const setCurrentBusiness = createAction(
  '[App Page] Set Current Business',
  props<{ currentBusiness: Business }>()
);
export const deleteBusiness = createAction(
  '[App Page] Delete Business',
  props<{ businessid: any }>()
);