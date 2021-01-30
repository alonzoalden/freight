import { createAction, props } from '@ngrx/store';
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