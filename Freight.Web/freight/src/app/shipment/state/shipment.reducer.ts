import { createReducer, on } from '@ngrx/store';
import { Shipment } from '../../_shared/model/shipment';
import { ShipmentApiActions, ShipmentPageActions } from './actions';
// import { Item } from '../component/edit-shipment/''node_modules/app/_shared/model/item';

export interface ShipmentState {
  allShipments: Shipment[];
  selectedShipment: Shipment;
  isSaving: boolean;
  isLoading: boolean,
  error: string;
}

const initalState: ShipmentState = {
  allShipments: null,
  selectedShipment: null,
  isSaving: false,
  isLoading: false,
  error: ''
};

export const shipmentReducer = createReducer<ShipmentState>(
  initalState,
  on(ShipmentPageActions.loadShipmentList, (state, action): ShipmentState => {
    return {
      ...state,
      isLoading: true,
      error: ''
    };
  }),
  on(ShipmentApiActions.loadShipmentsListSuccess, (state, action): ShipmentState => {
    return {
      ...state,
      allShipments: action.shipments,
      isLoading: false,
      error: ''
    };
  }),
  on(ShipmentApiActions.loadShipmentsListFailure, (state, action): ShipmentState => {
    return {
      ...state,
      allShipments: null,
      isLoading: false,
      error: action.error
    };
  }),
  on(ShipmentPageActions.setCurrentShipment, (state, action): ShipmentState => {
    return {
      ...state,
      selectedShipment: action.currentShipment
    };
  }),
  on(ShipmentPageActions.updateShipment, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: true,
      selectedShipment: action.shipment
    };
  }),
  on(ShipmentApiActions.updateShipmentSuccess, (state, action): ShipmentState => {
    const index = state.allShipments.findIndex((x)=> x.shipmentID == action.shipment.shipmentID);
    const list = [...state.allShipments];
    list.splice(index, 1, action.shipment);
    return Object.assign({
      isSaving: false,
      allItems: list,
      selectedItem: action.shipment
    });
  }),
  on(ShipmentApiActions.updateShipmentFailure, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
    };
  }),
);
