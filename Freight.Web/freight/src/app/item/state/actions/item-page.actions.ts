import { createAction, props } from '@ngrx/store';
import { Item } from 'app/_shared/model/item';

export const setCurrentItem = createAction(
  '[App Page] Set Current Item',
  props<{ currentItem: Item }>()
);
export const loadItemList = createAction(
  '[Item Page] Load Item List'
);
