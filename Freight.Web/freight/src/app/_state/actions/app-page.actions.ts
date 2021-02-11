import { createAction, props } from '@ngrx/store';

export const loadBusinesses = createAction(
  '[App Page] Load Businesses',
  props<{ userID: any }>()
);

export const setCurrentBusiness = createAction(
  '[App Page] Set Current Businesses',
  props<{ currentBusinessId: number }>()
);
export const setCurrentUser = createAction(
  '[App Page] Set Current User',
  props<{ user: any }>()
);

export const clearCurrentBusiness = createAction(
  '[App Page] Clear Current Businesses'
);

export const loginUser = createAction(
  '[App Page] Login User'
);

export const logoutUser = createAction(
  '[App Page] Login User'
);

export const getTest = createAction(
  '[App Page] Get Test',
  props<{ token: string }>()
);
