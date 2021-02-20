import { createAction, props } from '@ngrx/store';
import { Customer } from 'app/_shared/model/customer';
import { Fee } from 'app/_shared/model/fee';
import { Item } from 'app/_shared/model/item';
import { Shipment } from '../../../_shared/model/shipment';

export const loadShipmentsListSuccess = createAction(
  '[Shipment API] Load Shipment List Success',
  props<{ shipments: Shipment[] }>()
);
export const loadShipmentsListFailure = createAction(
  '[Shipment API] Load Shipment List Fail',
  props<{ error: string }>()
);

export const getShipmentSuccess = createAction(
  '[Shipment API] Get Shipment Success',
  props<{ shipment: Shipment }>()
);
export const getShipmentFailure = createAction(
  '[Shipment API] Get Shipment Fail',
  props<{ error: string }>()
);

export const updateShipmentSuccess = createAction(
  '[Shipment API] Update Shipment Success',
  props<{ shipment: Shipment }>()
);
export const updateShipmentFailure = createAction(
  '[Shipment API] Update Shipment Fail',
  props<{ error: string }>()
);

export const createShipmentSuccess = createAction(
  '[Shipment API] Shipment Shipment Success',
  props<{ shipment: Shipment }>()
);
export const createShipmentFailure = createAction(
  '[Shipment API] Create Shipment Fail',
  props<{ error: string }>()
);

export const deleteShipmentPackageSuccess = createAction(
  '[Shipment API] Delete Shipment Package Success',
  props<{ shipmentPackageID: any }>()
);
export const deleteShipmentPackageFailure = createAction(
  '[Shipment API] Delete Shipment Package Fail',
  props<{ error: string }>()
);

export const deleteShipmentLineSuccess = createAction(
  '[Shipment API] Delete Shipment Line Success',
  props<{ shipmentLineID: any }>()
);
export const deleteShipmentLineFailure = createAction(
  '[Shipment API] Delete Shipment Line Fail',
  props<{ error: string }>()
);

export const deleteShipmentFeeSuccess = createAction(
  '[Shipment API] Delete Shipment Fee Success',
  props<{ shipmentFeeID: any }>()
);
export const deleteShipmentFeeFailure = createAction(
  '[Shipment API] Delete Shipment Fee Fail',
  props<{ error: string }>()
);

export const deleteShipmentContactSuccess = createAction(
  '[Shipment API] Delete Shipment Contact Success',
  props<{ shipmentContactID: any }>()
);
export const deleteShipmentContactFailure = createAction(
  '[Shipment API] Delete Shipment Contact Fail',
  props<{ error: string }>()
);


export const editShipmentPackageSuccess = createAction(
  '[Shipment API] Edit Shipment Package Success',
  props<{ shipmentPackage: any }>()
);
export const editShipmentPackageFailure = createAction(
  '[Shipment API] Edit Shipment Package Fail',
  props<{ error: string }>()
);

export const editShipmentLineSuccess = createAction(
  '[Shipment API] Edit Shipment Line Success',
  props<{ shipmentLine: any }>()
);
export const editShipmentLineFailure = createAction(
  '[Shipment API] Edit Shipment Line Fail',
  props<{ error: string }>()
);

export const editShipmentFeeSuccess = createAction(
  '[Shipment API] Edit Shipment Fee Success',
  props<{ shipmentFee: any }>()
);
export const editShipmentFeeFailure = createAction(
  '[Shipment API] Edit Shipment Fee Fail',
  props<{ error: string }>()
);

export const editShipmentContactSuccess = createAction(
  '[Shipment API] Edit Shipment Contact Success',
  props<{ shipmentContact: any }>()
);
export const editShipmentContactFailure = createAction(
  '[Shipment API] Edit Shipment Contact Fail',
  props<{ error: string }>()
);

export const loadFeesListSuccess = createAction(
  '[Shipment API] Load Fees List Success',
  props<{ fees: Fee[] }>()
);
export const loadFeesListFailure = createAction(
  '[Shipment API] Load Fees List Fail',
  props<{ error: string }>()
);
export const loadContactsListSuccess = createAction(
  '[Shipment API] Load Contact List Success',
  props<{ contacts: Customer[] }>()
);
export const loadContactsListFailure = createAction(
  '[Shipment API] Load Contact List Fail',
  props<{ error: string }>()
);
export const loadItemsListSuccess = createAction(
  '[Shipment API] Load Item List Success',
  props<{ items: Item[] }>()
);
export const loadItemsListFailure = createAction(
  '[Shipment API] Load Item List Fail',
  props<{ error: string }>()
);


export const getShippersSuccess = createAction(
  '[Shipment API] Get Shippers Success',
  props<{ shippers: any[] }>()
);
export const getShipperFailure = createAction(
  '[Shipment API] Get Shippers Fail',
  props<{ error: string }>()
);

export const get3plSuccess = createAction(
  '[Shipment API] Get 3PL Success',
  props<{ threePL: any[] }>()
);
export const get3plFailure = createAction(
  '[Shipment API] Get 3PL Fail',
  props<{ error: string }>()
);
export const getFfwSuccess = createAction(
  '[Shipment API] Get 3PL Success',
  props<{ ffw: any[] }>()
);
export const getFfwFailure = createAction(
  '[Shipment API] Get 3PL Fail',
  props<{ error: string }>()
);

export const getCustomersSuccess = createAction(
  '[Shipment Page] Get Business Customers Success',
  props<{ customers: any[] }>()
); 
export const getCustomersFailure = createAction(
  '[Shipment Page] Get Business Customers Failure',
  props<{ error: string }>()
); 
