import { createAction, props } from '@ngrx/store';

export const loadBusinessAccess = createAction(
  '[Dashboard Page] Load Business Access',
  props<{ id: number }>()
);
export const loadDashboardInfo = createAction(
  '[Dashboard Page] Load Dashboard Info',
  props<{ businessid: any }>()
);

