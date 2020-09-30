import { createAction, props } from '@ngrx/store';

export const loadBusinessAccess = createAction(
  '[Dashboard Page] Load Business Access',
  props<{ id: number }>()
);
