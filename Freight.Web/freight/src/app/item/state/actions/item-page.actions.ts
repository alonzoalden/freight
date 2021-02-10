import { createAction, props } from '@ngrx/store';
import { Item } from 'app/_shared/model/item';

export const loadAllItemList = createAction(
  '[Item Page] Load All Item List',
);
export const loadItemList = createAction(
  '[Item Page] Load Item List',
  props<{ businessid: any }>()
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
  '[Item Page] Set Current Item',
  props<{ currentItem: Item }>()
);
export const deleteItem = createAction(
  '[Item Page] Delete Item',
  props<{ itemid: any }>()
);