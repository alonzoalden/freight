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

export const getItemSuccess = createAction(
  '[Item API] Get Item Success',
  props<{ item: Item }>()
);
export const getItemFailure = createAction(
  '[Item API] Get Item Fail',
  props<{ error: string }>()
);

export const updateItemSuccess = createAction(
  '[Item API] Update Item Success',
  props<{ item: Item }>()
);
export const updateItemFailure = createAction(
  '[Item API] Update Item Fail',
  props<{ error: string }>()
);

export const createItemSuccess = createAction(
  '[Item API] Create Item Success',
  props<{ item: Item }>()
);
export const createItemFailure = createAction(
  '[Item API] Create Item Fail',
  props<{ error: string }>()
);