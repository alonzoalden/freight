import { createReducer, on } from '@ngrx/store';
import { LocationApiActions, LocationPageActions } from './actions';
import { Location } from 'app/_shared/model/location';

export interface LocationState {
  allLocations: Location[];
  selectedLocation: Location;
  isSaving: boolean;
  isLoading: boolean,
  error: string;
}

const initalState: LocationState = {
  allLocations: null,
  selectedLocation: null,
  isSaving: false,
  isLoading: false,
  error: ''
};

export const locationReducer = createReducer<LocationState>(
  initalState,
  on(LocationPageActions.loadLocationList, (state, action): LocationState => {
    return {
      ...state,
      isLoading: true,
      error: ''
    };
  }),
  on(LocationApiActions.loadLocationsListSuccess, (state, action): LocationState => {
    return {
      ...state,
      allLocations: action.locations,
      isLoading: false,
      error: ''
    };
  }),
  on(LocationApiActions.loadLocationsListFailure, (state, action): LocationState => {
    return {
      ...state,
      allLocations: null,
      isLoading: false,
      error: action.error
    };
  }),
  on(LocationPageActions.createLocation, (state, action): LocationState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(LocationApiActions.createLocationSuccess, (state, action): LocationState => {
    return {
      ...state,
      allLocations: [action.location, ...state.allLocations],
      selectedLocation: action.location,
      isSaving: false,
      error: ''
    };
  }),
  on(LocationApiActions.createLocationFailure, (state, action): LocationState => {
    return {
      ...state,
      isSaving: false,
      selectedLocation: null,
      error: ''
    };
  }),
  on(LocationApiActions.loadLocationsListFailure, (state, action): LocationState => {
    return {
      ...state,
      allLocations: null,
      isLoading: false,
      error: action.error
    };
  }),
  on(LocationPageActions.setCurrentLocation, (state, action): LocationState => {
    return {
      ...state,
      selectedLocation: action.currentLocation
    };
  }),
  on(LocationPageActions.updateLocation, (state, action): LocationState => {
    return {
      ...state,
      isSaving: true,
      selectedLocation: action.location
    };
  }),
  on(LocationApiActions.updateLocationSuccess, (state, action): LocationState => {
    const index = state.allLocations.findIndex((x)=> x.locationID == action.location.locationID);
    const list = [...state.allLocations];
    list.splice(index, 1, action.location);
    return Object.assign({
      isSaving: false,
      allLocations: list,
      selectedLocation: action.location
    });
  }),
  on(LocationApiActions.updateLocationFailure, (state, action): LocationState => {
    return {
      ...state,
      isSaving: false,
    };
  }),
);
