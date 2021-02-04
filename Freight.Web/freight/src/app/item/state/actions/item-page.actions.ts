import { createAction, props } from '@ngrx/store';
import { Item } from 'app/_shared/model/item';

export const loadItemList = createAction(
  '[Item Page] Load Item List'
);
export const getItem = createAction(
  '[Item Page] Get Item',
  props<{ item: Item }>()
);
export const updateItem = createAction(
  '[Item Page] Update Item',
  props<{ item: Item }>()
);
export const createItem = createAction(
  '[Item Page] Create Item',
  props<{ item: Item }>()
);
export const setCurrentItem = createAction(
  '[App Page] Set Current Item',
  props<{ currentItem: Item }>()
);