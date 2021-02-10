import { createReducer, on } from '@ngrx/store';
import { Shipment, ShipmentDetail, ShipmentPackage } from '../../_shared/model/shipment';
import { ShipmentApiActions, ShipmentPageActions } from './actions';
// import { Item } from '../component/edit-shipment/''node_modules/app/_shared/model/item';

export interface ShipmentState {
  allShipments: Shipment[];
  selectedShipment: Shipment;
  selectedShipmentDetail: ShipmentDetail;
  currentShipmentPackageRow: ShipmentPackage;
  isSaving: boolean;
  isLoading: boolean,
  error: string;
}

const initalState: ShipmentState = {
  allShipments: null,
  selectedShipment: null,
  selectedShipmentDetail: null,
  currentShipmentPackageRow: null,
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
  on(ShipmentPageActions.setCurrentShipmentPackageRow, (state, action): ShipmentState => {
    return {
      ...state,
      currentShipmentPackageRow: action.currentShipmentPackageRow
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
      isLoading: false,
    };
  }),

  on(ShipmentPageActions.deleteShipmentPackage, (state, action): ShipmentState => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(ShipmentApiActions.deleteShipmentPackageSuccess, (state, action): ShipmentState => {
    let updatedPackages = state.selectedShipmentDetail?.shipmentPackages.filter(shipmentpackage => shipmentpackage.shipmentPackageID !== action.shipmentPackageID);
    state.selectedShipmentDetail.shipmentPackages = updatedPackages;

    return {
      ...state,
      isLoading: false,
      currentShipmentPackageRow: null,
      selectedShipmentDetail: state.selectedShipmentDetail
    };
  }),
  on(ShipmentApiActions.deleteShipmentPackageFailure, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
    };
  }),

);
