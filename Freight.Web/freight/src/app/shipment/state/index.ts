import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAppState from '../../_state';
import { ShipmentState } from './shipment.reducer';
import { AppState } from '../../_state/app.reducer';

export interface State extends fromAppState.State {
  shipment: ShipmentState;
}

const getShipmentFeatureState = createFeatureSelector<ShipmentState>('shipment');
const getAppFeatureState = createFeatureSelector<AppState>('app');

export const getAllShipmentList = createSelector(
  getShipmentFeatureState,
  state => state.allShipments
);
export const getSelectedShipment = createSelector(
  getShipmentFeatureState,
  state => state.selectedShipment
);
export const getSelectedShipmentPackageRow = createSelector(
  getShipmentFeatureState,
  state => state.currentShipmentPackageRow
);
export const getSelectedShipmentLineRow = createSelector(
  getShipmentFeatureState,
  state => state.currentShipmentLineRow
);
export const getSelectedShipmentFeeRow = createSelector(
  getShipmentFeatureState,
  state => state.currentShipmentFeeRow
);
export const getSelectedShipmentContactRow = createSelector(
  getShipmentFeatureState,
  state => state.currentShipmentContactRow
);

export const getFeeList = createSelector(
  getShipmentFeatureState,
  state => state.feeList
);
export const getContactList = createSelector(
  getShipmentFeatureState,
  state => state.contactList
);

export const getItemList = createSelector(
  getShipmentFeatureState,
  state => state.itemList
);

export const getIsSaving = createSelector(
  getShipmentFeatureState,
  state => state.isSaving
);
export const getIsLoading = createSelector(
  getShipmentFeatureState,
  state => state.isLoading
);
