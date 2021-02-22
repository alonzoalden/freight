import { createAction, props } from '@ngrx/store';
import { Shipment, ShipmentContact, ShipmentFee, ShipmentLine, ShipmentPackage } from '../../../_shared/model/shipment';

export const loadShipmentList = createAction(
  '[Shipment Page] Load Shipment List',
  props<{ businessID: any }>()
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
  '[Shipment Page] Set Current Shipment Package Row',
  props<{ currentShipmentPackageRow: ShipmentPackage }>()
);
export const setCurrentShipmentLineRow = createAction(
  '[Shipment Page] Set Current Shipment Line Row',
  props<{ currentShipmentLineRow: ShipmentLine }>()
);
export const setCurrentShipmentFeeRow = createAction(
  '[Shipment Page] Set Current Shipment Fee Row',
  props<{ currentShipmentFeeRow: ShipmentFee }>()
);
export const setCurrentShipmentContactRow = createAction(
  '[Shipment Page] Set Current Shipment Contact Row',
  props<{ currentShipmentContactRow: ShipmentContact }>()
);

export const editShipmentPackage = createAction(
  '[Shipment Page] Edit Shipment Package',
  props<{ shipmentPackage: any }>()
);
export const editShipmentLine = createAction(
  '[Shipment Page] Edit Shipment Line',
  props<{ shipmentLine: any }>()
);
export const editShipmentFee = createAction(
  '[Shipment Page] Edit Shipment Fee',
  props<{ shipmentFee: any }>()
);
export const editShipmentContact = createAction(
  '[Shipment Page] Edit Shipment Contact',
  props<{ shipmentContact: any }>()
);

export const deleteShipmentPackage = createAction(
  '[Shipment Page] Delete Shipment Package',
  props<{ shipmentPackageID: any }>()
);
export const deleteShipmentLine = createAction(
  '[Shipment Page] Delete Shipment Line',
  props<{ shipmentLineID: any }>()
);
export const deleteShipmentFee = createAction(
  '[Shipment Page] Delete Shipment Fee',
  props<{ shipmentFeeID: any }>()
);
export const deleteShipmentContact = createAction(
  '[Shipment Page] Delete Shipment Contact',
  props<{ shipmentContactID: any }>()
);

export const loadFeeList = createAction(
  '[Shipment Page] Load Fee List',
  props<{ businessID: any }>()
);
export const loadItemList = createAction(
  '[Shipment Page] Load Item List',
  props<{ businessID: any }>()
);

export const loadContactList = createAction(
  '[Shipment Page] Load Contact List',
  props<{ businessID: any }>()
);

export const getShippers = createAction(
  '[Shipment Page] Get Shippers',
);
export const get3pl = createAction(
  '[Shipment Page] Get 3PL',
);
export const getFfw = createAction(
  '[Shipment Page] Get FFW',
);
export const getCustomers = createAction(
  '[Shipment Page] Get Customer',
  props<{ businessID: any }>()
); 


export const loadShipmentLineList = createAction(
  '[Shipment Page] Shipment Line List',
  props<{ shipmentID: any }>()
);

export const loadShipmentPackageList = createAction(
  '[Shipment Page] Load Shipment Package List',
  props<{ shipmentID: any }>()
);

export const loadShipmentFeeList = createAction(
  '[Shipment Page] Load Shipment Fee List',
  props<{ shipmentID: any }>()
);

export const loadShipmentContactList = createAction(
  '[Shipment Page] Load Shipment Contact List',
  props<{ shipmentID: any }>()
);

export const loadShipmentCommentList = createAction(
  '[Shipment Page] Load Shipment Comment List',
  props<{ shipmentID: any }>()
);