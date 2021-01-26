import { createAction, props } from '@ngrx/store';
import { Item } from 'app/_shared/model/item';

export const loadItemsListSuccess = createAction(
  '[Item API] Load Items List Success',
  props<{ items: Item[] }>()
);

export const loadItemsListFailure = createAction(
  '[Item API] Load Items List Fail',
  props<{ error: string }>()
);
