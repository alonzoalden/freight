import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAppState from '../../_state';
import { ItemState } from './item.reducer';
import { AppState } from '../../_state/app.reducer';

export interface State extends fromAppState.State {
  item: ItemState;
}

const getItemFeatureState = createFeatureSelector<ItemState>('item');
const getAppFeatureState = createFeatureSelector<AppState>('app');

export const getCurrentBusinessEntityId = createSelector(
  getAppFeatureState,
  state => state.currentBusinessEntityId
);

export const getAllItemList = createSelector(
  getItemFeatureState,
  state => state.allItems
);
export const getSelectedItem = createSelector(
  getItemFeatureState,
  state => state.selectedItem
);
export const getIsSaving = createSelector(
  getItemFeatureState,
  state => state.isSaving
);
export const getIsLoading = createSelector(
  getItemFeatureState,
  state => state.isLoading
);
