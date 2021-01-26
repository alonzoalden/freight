import { createReducer, on } from '@ngrx/store';
import { ItemApiActions, ItemPageActions } from './actions';
import { Item } from 'app/_shared/model/item';

export interface ItemState {
  allItems: Item[];
  selectedItem: Item;
  error: string;
}

const initalState: ItemState = {
  allItems: null,
  selectedItem: null,
  error: ''
};

export const itemReducer = createReducer<ItemState>(
  initalState,
  on(ItemApiActions.loadItemsListSuccess, (state, action): ItemState => {
    return {
      ...state,
      allItems: action.items,
      error: ''
    };
  }),
  on(ItemApiActions.loadItemsListFailure, (state, action): ItemState => {
    return {
      ...state,
      allItems: null,
      error: action.error
    };
  }),
  on(ItemPageActions.setCurrentItem, (state, action): ItemState => {
    return {
      ...state,
      selectedItem: action.currentItem
    };
  }),
);
