import { createReducer, on } from '@ngrx/store';
import { Contact, Customer } from 'app/_shared/model/customer';
import { Fee } from 'app/_shared/model/fee';
import { Item } from 'app/_shared/model/item';
import { Shipment, ShipmentContact, ShipmentDetail, ShipmentFee, ShipmentLine, ShipmentPackage } from '../../_shared/model/shipment';
import { ShipmentApiActions, ShipmentPageActions } from './actions';
// import { Item } from '../component/edit-shipment/''node_modules/app/_shared/model/item';

export interface ShipmentState {
  allShipments: Shipment[];
  selectedShipment: Shipment;
  selectedShipmentDetail: ShipmentDetail;
  selectedShipmentPackages: ShipmentPackage[];
  selectedShipmentLines: ShipmentLine[];
  selectedShipmentFees: ShipmentFee[];
  selectedShipmentContacts: ShipmentContact[];
  selectedShipmentComments: any[];
  currentShipmentPackageRow: ShipmentPackage;
  currentShipmentLineRow: ShipmentLine;
  currentShipmentFeeRow: ShipmentFee;
  currentShipmentContactRow: ShipmentContact;
  feeList: Fee[];
  itemList: Item[];
  contactList: Contact[];
  locationsList: Location[];
  ffwList: any[];
  threePLList: any[];
  shippersList: any[];
  customersList: any[];
  isSaving: boolean;
  isLoading: boolean,
  isShipmentListLoading: boolean,
  error: string;
}

const initalState: ShipmentState = {
  allShipments: null,
  selectedShipment: null,
  selectedShipmentDetail: null,
  selectedShipmentPackages: null,
  selectedShipmentLines: null,
  selectedShipmentFees: null,
  selectedShipmentContacts: null,
  selectedShipmentComments: null,
  currentShipmentPackageRow: null,
  currentShipmentLineRow: null,
  currentShipmentFeeRow: null,
  currentShipmentContactRow: null,
  feeList: null,
  itemList: null,
  contactList: null,
  locationsList: null,
  ffwList: [],
  threePLList: [],
  shippersList: [],
  customersList: [],
  isSaving: false,
  isLoading: false,
  isShipmentListLoading: false,
  error: ''
};



export const shipmentReducer = createReducer<ShipmentState>(
  initalState,
  on(ShipmentPageActions.loadShipmentList, (state, action): ShipmentState => {
    return {
      ...state,
      isShipmentListLoading: true,
      error: ''
    };
  }),
  on(ShipmentApiActions.loadShipmentsListSuccess, (state, action): ShipmentState => {
    return {
      ...state,
      allShipments: action.shipments,
      isShipmentListLoading: false,
      error: ''
    };
  }),
  on(ShipmentApiActions.loadShipmentsListFailure, (state, action): ShipmentState => {
    return {
      ...state,
      allShipments: null,
      isShipmentListLoading: false,
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
  on(ShipmentPageActions.setCurrentShipmentLineRow, (state, action): ShipmentState => {
    return {
      ...state,
      currentShipmentLineRow: action.currentShipmentLineRow
    };
  }),
  on(ShipmentPageActions.setCurrentShipmentFeeRow, (state, action): ShipmentState => {
    return {
      ...state,
      currentShipmentFeeRow: action.currentShipmentFeeRow
    };
  }),
  on(ShipmentPageActions.setCurrentShipmentContactRow, (state, action): ShipmentState => {
    return {
      ...state,
      currentShipmentContactRow: action.currentShipmentContactRow
    };
  }),

  on(ShipmentPageActions.createShipment, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(ShipmentApiActions.createShipmentSuccess, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
      selectedShipment: action.shipment,
      allShipments: [action.shipment, ...state.allShipments]
    };
  }),
  on(ShipmentApiActions.createShipmentFailure, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
    };
  }),

  on(ShipmentPageActions.deleteShipment, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(ShipmentApiActions.deleteShipmentSuccess, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
      selectedShipment: null,
      allShipments: state.allShipments.filter( shipment => shipment.shipmentID !== action.shipmentID)
    };
  }),
  on(ShipmentApiActions.deleteShipmentFailure, (state, action): ShipmentState => {
    return {
      ...state,
      isLoading: false,
      isSaving: false,
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
      ...state,
      isSaving: false,
      allShipments: list,
      selectedShipment: action.shipment
    });
  }),
  on(ShipmentApiActions.updateShipmentFailure, (state, action): ShipmentState => {
    return {
      ...state,
      isLoading: false,
    };
  }),

  on(ShipmentPageActions.createShipmentLine, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(ShipmentApiActions.createShipmentLineSuccess, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
      currentShipmentLineRow: action.shipmentLine,
      selectedShipmentLines: [action.shipmentLine, ...state.selectedShipmentLines]
    };
  }),
  on(ShipmentApiActions.createShipmentLineFailure, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
    };
  }),

  on(ShipmentPageActions.createShipmentPackage, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(ShipmentApiActions.createShipmentPackageSuccess, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
      currentShipmentPackageRow: action.shipmentPackage,
      selectedShipmentPackages: [action.shipmentPackage, ...state.selectedShipmentPackages]
    };
  }),
  on(ShipmentApiActions.createShipmentPackageFailure, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
    };
  }),
  on(ShipmentPageActions.createShipmentFee, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(ShipmentApiActions.createShipmentFeeSuccess, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
      currentShipmentFeeRow: action.shipmentFee,
      selectedShipmentFees: [action.shipmentFee, ...state.selectedShipmentFees]
    };
  }),
  on(ShipmentApiActions.createShipmentFeeFailure, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
    };
  }),
  on(ShipmentPageActions.createShipmentContact, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(ShipmentApiActions.createShipmentContactSuccess, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
      currentShipmentContactRow: action.shipmentContact,
      selectedShipmentContacts: [action.shipmentContact, ...state.selectedShipmentContacts]
    };
  }),
  on(ShipmentApiActions.createShipmentContactFailure, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
    };
  }),
  on(ShipmentPageActions.createShipmentComment, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(ShipmentApiActions.createShipmentCommentSuccess, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
      selectedShipmentComments: [...state.selectedShipmentComments, action.shipmentComment]
    };
  }),
  on(ShipmentApiActions.createShipmentCommentFailure, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
    };
  }),

  on(ShipmentPageActions.editShipmentLine, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(ShipmentApiActions.editShipmentLineSuccess, (state, action): ShipmentState => {
    const index = state.selectedShipmentLines.findIndex((x)=> x.shipmentLineID == action.shipmentLine.shipmentLineID);
    const list = [...state.selectedShipmentLines];
    list.splice(index, 1, action.shipmentLine);
    return Object.assign({
      ...state,
      isSaving: false,
      selectedShipmentLines: list,
      selectedShipmentLineRow: action.shipmentLine
    });
  }),
  on(ShipmentApiActions.editShipmentLineFailure, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
    };
  }),
  
  on(ShipmentPageActions.editShipmentPackage, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(ShipmentApiActions.editShipmentPackageSuccess, (state, action): ShipmentState => {
    const index = state.selectedShipmentPackages.findIndex((x)=> x.shipmentPackageID == action.shipmentPackage.shipmentPackageID);
    const list = [...state.selectedShipmentPackages];
    list.splice(index, 1, action.shipmentPackage);
    return Object.assign({
      ...state,
      isSaving: false,
      selectedShipmentPackages: list,
      selectedShipmentPackageRow: action.shipmentPackage,
    });
  }),
  on(ShipmentApiActions.editShipmentPackageFailure, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
    };
  }),
  
  on(ShipmentPageActions.editShipmentFee, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(ShipmentApiActions.editShipmentFeeSuccess, (state, action): ShipmentState => {
    const index = state.selectedShipmentFees.findIndex((x)=> x.shipmentFeeID == action.shipmentFee.shipmentFeeID);
    const list = [...state.selectedShipmentFees];
    list.splice(index, 1, action.shipmentFee);
    return Object.assign({
      ...state,
      isSaving: false,
      selectedShipmentFees: list,
      selectedShipmentFeeRow: action.shipmentFee
    });
  }),
  on(ShipmentApiActions.editShipmentFeeFailure, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
    };
  }),
  on(ShipmentPageActions.editShipmentContact, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(ShipmentApiActions.editShipmentContactSuccess, (state, action): ShipmentState => {
    const index = state.selectedShipmentContacts.findIndex((x)=> x.shipmentContactID == action.shipmentContact.shipmentContactID);
    const list = [...state.selectedShipmentContacts];
    list.splice(index, 1, action.shipmentContact);
    return Object.assign({
      ...state,
      isSaving: false,
      selectedShipmentContacts: list,
      selectedShipmentContactRow: action.shipmentContact
    });
  }),
  on(ShipmentApiActions.editShipmentContactFailure, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
    };
  }),
  on(ShipmentPageActions.editShipmentComment, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(ShipmentApiActions.editShipmentCommentSuccess, (state, action): ShipmentState => {
    const index = state.selectedShipmentComments.findIndex((x)=> x.shipmentCommentID == action.shipmentComment.shipmentCommentID);
    const list = [...state.selectedShipmentComments];
    list.splice(index, 1, action.shipmentComment);
    return Object.assign({
      ...state,
      isSaving: false,
      selectedShipmentComments: list
    });
  }),
  on(ShipmentApiActions.editShipmentContactFailure, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
    };
  }),
  
  on(ShipmentPageActions.deleteShipmentPackage, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(ShipmentApiActions.deleteShipmentPackageSuccess, (state, action): ShipmentState => {
    // let updatedPackages = state.selectedShipmentDetail?.shipmentPackages.filter(shipmentpackage => shipmentpackage.shipmentPackageID !== action.shipmentPackageID);
    // state.selectedShipmentDetail.shipmentPackages = updatedPackages;
    return {
      ...state,
      isSaving: false,
      currentShipmentPackageRow: null,
      selectedShipmentPackages: state.selectedShipmentPackages.filter(item => item.shipmentPackageID !== action.shipmentPackageID)
    };
  }),
  on(ShipmentApiActions.deleteShipmentPackageFailure, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
    };
  }),


  on(ShipmentPageActions.deleteShipmentLine, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(ShipmentApiActions.deleteShipmentLineSuccess, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
      currentShipmentLineRow: null,
      selectedShipmentLines: state.selectedShipmentLines.filter(item => item.shipmentLineID !== action.shipmentLineID)
    };
  }),
  on(ShipmentApiActions.deleteShipmentLineFailure, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
    };
  }),

  on(ShipmentPageActions.deleteShipmentFee, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(ShipmentApiActions.deleteShipmentFeeSuccess, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
      currentShipmentFeeRow: null,
      selectedShipmentFees: state.selectedShipmentFees.filter(item => item.shipmentFeeID !== action.shipmentFeeID)
    };
  }),
  on(ShipmentApiActions.deleteShipmentFeeFailure, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
    };
  }),

  on(ShipmentPageActions.deleteShipmentContact, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(ShipmentApiActions.deleteShipmentContactSuccess, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
      currentShipmentContactRow: null,
      selectedShipmentContacts: state.selectedShipmentContacts.filter(item => item.shipmentContactID !== action.shipmentContactID)
    };
  }),
  on(ShipmentApiActions.deleteShipmentContactFailure, (state, action): ShipmentState => {
    return {
      ...state,
      isSaving: false,
    };
  }),

  on(ShipmentPageActions.loadFeeList, (state, action): ShipmentState => {
    return {
      ...state,
      //isLoading: true,
      error: ''
    };
  }),
  on(ShipmentApiActions.loadFeesListSuccess, (state, action): ShipmentState => {
    return {
      ...state,
      feeList: action.fees,
      //isLoading: false,
      error: ''
    };
  }),
  on(ShipmentApiActions.loadFeesListFailure, (state, action): ShipmentState => {
    return {
      ...state,
      //isLoading: false,
      error: action.error
    };
  }),

  on(ShipmentPageActions.loadItemList, (state, action): ShipmentState => {
    return {
      ...state,
      //isLoading: true,
      error: ''
    };
  }),
  on(ShipmentApiActions.loadItemsListSuccess, (state, action): ShipmentState => {
    return {
      ...state,
      itemList: action.items,
      //isLoading: false,
      error: ''
    };
  }),
  on(ShipmentApiActions.loadItemsListFailure, (state, action): ShipmentState => {
    return {
      ...state,
      //isLoading: false,
      error: action.error
    };
  }),

  on(ShipmentPageActions.loadContactList, (state, action): ShipmentState => {
    return {
      ...state,
      //isLoading: true,
      error: ''
    };
  }),
  on(ShipmentApiActions.loadContactsListSuccess, (state, action): ShipmentState => {
    return {
      ...state,
      contactList: action.contacts,
      //isLoading: false,
      error: ''
    };
  }),
  on(ShipmentApiActions.loadContactsListFailure, (state, action): ShipmentState => {
    return {
      ...state,
      //isLoading: false,
      error: action.error
    };
  }),


  on(ShipmentPageActions.get3pl, (state, action): ShipmentState => {
    return {
      ...state,
      //isLoading: true,
      error: ''
    };
  }),
  on(ShipmentApiActions.get3plSuccess, (state, action): ShipmentState => {
    return {
      ...state,
      threePLList: action.threePL,
      //isLoading: false,
      error: ''
    };
  }),
  on(ShipmentApiActions.get3plFailure, (state, action): ShipmentState => {
    return {
      ...state,
      //isLoading: false,
      error: action.error
    };
  }),

  on(ShipmentPageActions.getFfw, (state, action): ShipmentState => {
    return {
      ...state,
     // isLoading: true,
      error: ''
    };
  }),
  on(ShipmentApiActions.getFfwSuccess, (state, action): ShipmentState => {
    return {
      ...state,
      ffwList: action.ffw,
      //isLoading: false,
      error: ''
    };
  }),
  on(ShipmentApiActions.getFfwFailure, (state, action): ShipmentState => {
    return {
      ...state,
      isLoading: false,
      error: action.error
    };
  }),
  on(ShipmentPageActions.getShippers, (state, action): ShipmentState => {
    return {
      ...state,
      isLoading: true,
      error: ''
    };
  }),
  on(ShipmentApiActions.getShippersSuccess, (state, action): ShipmentState => {
    return {
      ...state,
      shippersList: action.shippers,
      isLoading: false,
      error: ''
    };
  }),
  on(ShipmentApiActions.getShipperFailure, (state, action): ShipmentState => {
    return {
      ...state,
      //isLoading: false,
      error: action.error
    };
  }),
  on(ShipmentPageActions.getCustomers, (state, action): ShipmentState => {
    return {
      ...state,
      //isLoading: true,
      error: ''
    };
  }),
  on(ShipmentApiActions.getCustomersSuccess, (state, action): ShipmentState => {
    return {
      ...state,
      customersList: action.customers,
      //isLoading: false,
      error: ''
    };
  }),
  on(ShipmentApiActions.getCustomersFailure, (state, action): ShipmentState => {
    return {
      ...state,
      //isLoading: false,
      error: action.error
    };
  }),
  on(ShipmentPageActions.getLocations, (state, action): ShipmentState => {
    return {
      ...state,
      //isLoading: true,
      error: ''
    };
  }),
  on(ShipmentApiActions.getLocationsSuccess, (state, action): ShipmentState => {
    return {
      ...state,
      locationsList: action.locations,
      //isLoading: false,
      error: ''
    };
  }),
  on(ShipmentApiActions.getLocationsFailure, (state, action): ShipmentState => {
    return {
      ...state,
      //isLoading: false,
      error: action.error
    };
  }),

  on(ShipmentPageActions.loadShipmentLineList, (state, action): ShipmentState => {
    return {
      ...state,
      //isLoading: true,
      error: ''
    };
  }),
  on(ShipmentApiActions.loadShipmentLineListSuccess, (state, action): ShipmentState => {
    return {
      ...state,
      selectedShipmentLines: action.shipmentLines,
      //isLoading: false,
      error: ''
    };
  }),
  on(ShipmentApiActions.loadShipmentLineListFailure, (state, action): ShipmentState => {
    return {
      ...state,
      //isLoading: false,
      error: action.error
    };
  }),
  on(ShipmentPageActions.loadShipmentPackageList, (state, action): ShipmentState => {
    return {
      ...state,
      //isLoading: true,
      error: ''
    };
  }),
  on(ShipmentApiActions.loadShipmentPackageListSuccess, (state, action): ShipmentState => {
    return {
      ...state,
      selectedShipmentPackages: action.shipmentPackages,
      //isLoading: false,
      error: ''
    };
  }),
  on(ShipmentApiActions.loadShipmentPackageListFailure, (state, action): ShipmentState => {
    return {
      ...state,
      //isLoading: false,
      error: action.error
    };
  }),

  on(ShipmentPageActions.loadShipmentFeeList, (state, action): ShipmentState => {
    return {
      ...state,
      //isLoading: true,
      error: ''
    };
  }),
  on(ShipmentApiActions.loadShipmentFeeListSuccess, (state, action): ShipmentState => {
    return {
      ...state,
      selectedShipmentFees: action.shipmentFee,
      //isLoading: false,
      error: ''
    };
  }),
  on(ShipmentApiActions.loadShipmentFeeListFailure, (state, action): ShipmentState => {
    return {
      ...state,
      //isLoading: false,
      error: action.error
    };
  }),

  on(ShipmentPageActions.loadShipmentContactList, (state, action): ShipmentState => {
    return {
      ...state,
      //isLoading: true,
      error: ''
    };
  }),
  on(ShipmentApiActions.loadShipmentContactListSuccess, (state, action): ShipmentState => {
    return {
      ...state,
      selectedShipmentContacts: action.shipmentContacts,
      //isLoading: false,
      error: ''
    };
  }),
  on(ShipmentApiActions.loadShipmentContactListFailure, (state, action): ShipmentState => {
    return {
      ...state,
      //isLoading: false,
      error: action.error
    };
  }),

  on(ShipmentPageActions.loadShipmentCommentList, (state, action): ShipmentState => {
    return {
      ...state,
      //isLoading: true,
      error: ''
    };
  }),
  on(ShipmentApiActions.loadShipmentCommentListSuccess, (state, action): ShipmentState => {
    return {
      ...state,
      selectedShipmentComments: action.shipmentComments,
      //isLoading: false,
      error: ''
    };
  }),
  on(ShipmentApiActions.loadShipmentCommentListFailure, (state, action): ShipmentState => {
    return {
      ...state,
      //isLoading: false,
      error: action.error
    };
  }),
);