import { createAction, props } from '@ngrx/store';
import { Shipment, ShipmentPackage } from '../../../_shared/model/shipment';
// import { Item } from '../../component/edit-shipment/node_modules/app/_shared/model/item';

export const loadShipmentList = createAction(
  '[Shipment Page] Load Shipment List'
);
export const getShipment = createAction(
  '[Shipment Page] Get Shipment',
  props<{ shipment: Shipment }>()
);
export const updateShipment = createAction(
  '[Shipment Page] Update Shipment',
  props<{ shipment: Shipment }>()
);
export const createShipment = createAction(
  '[Shipment Page] Create Shipment',
  props<{ shipment: Shipment }>()
);
export const setCurrentShipment = createAction(
  '[Shipment Page] Set Current Shipment',
  props<{ currentShipment: Shipment }>()
);
export const setCurrentShipmentPackageRow = createAction(
  '[Shipment Page] Set Current Shipment',
  props<{ currentShipmentPackageRow: ShipmentPackage }>()
);
export const deleteShipmentPackage = createAction(
  '[Shipment Page] Delete Shipment Package',
  props<{ shipmentPackageID: any }>()
);