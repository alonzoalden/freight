import { createReducer, on } from '@ngrx/store';
import { ItemApiActions, ItemPageActions } from './actions';
import { Item } from 'app/_shared/model/item';

export interface ItemState {
  allItems: Item[];
  selectedItem: Item;
  isSaving: boolean;
  isLoading: boolean,
  error: string;
}

const initalState: ItemState = {
  allItems: null,
  selectedItem: null,
  isSaving: false,
  isLoading: false,
  error: ''
};

export const itemReducer = createReducer<ItemState>(
  initalState,
  on(ItemPageActions.loadItemList, (state, action): ItemState => {
    return {
      ...state,
      isLoading: true,
      error: ''
    };
  }),
  on(ItemApiActions.loadItemsListSuccess, (state, action): ItemState => {
    return {
      ...state,
      allItems: action.items,
      isLoading: false,
      error: ''
    };
  }),
  on(ItemApiActions.loadItemsListFailure, (state, action): ItemState => {
    return {
      ...state,
      allItems: null,
      isLoading: false,
      error: action.error
    };
  }),
  on(ItemPageActions.setCurrentItem, (state, action): ItemState => {
    return {
      ...state,
      selectedItem: action.currentItem
    };
  }),
  on(ItemPageActions.updateItem, (state, action): ItemState => {
    return {
      ...state,
      isSaving: true,
      selectedItem: action.item
    };
  }),
  on(ItemApiActions.updateItemSuccess, (state, action): ItemState => {
    const index = state.allItems.findIndex((x)=> x.itemID == action.item.itemID);
    const list = [...state.allItems];
    list.splice(index, 1, action.item);
    return Object.assign({
      isSaving: false,
      allItems: list,
      selectedItem: action.item
    });
  }),
  on(ItemApiActions.updateItemFailure, (state, action): ItemState => {
    return {
      ...state,
      isSaving: false,
    };
  }),
  on(ItemPageActions.deleteItem, (state, action): ItemState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(ItemApiActions.deleteItemSuccess, (state, action): ItemState => {
    return {
      ...state,
      isSaving: false,
      allItems: state.allItems.filter(item => item.itemID !== action.itemid)
    };
  }),
  on(ItemApiActions.deleteItemFailure, (state, action): ItemState => {
    return {
      ...state,
      isSaving: false,
    };
  }),
);
