import { createAction, props } from '@ngrx/store';
import { Location } from 'app/_shared/model/location';

export const loadLocationList = createAction(
  '[Location Page] Load Location List'
);
export const getLocation = createAction(
  '[Location Page] Get Location',
  props<{ location: Location }>()
);
export const updateLocation = createAction(
  '[Location Page] Update Location',
  props<{ location: Location }>()
);
export const createLocation = createAction(
  '[Location Page] Create Location',
  props<{ location: Location }>()
);
export const setCurrentLocation = createAction(
  '[App Page] Set Current Location',
  props<{ currentLocation: Location }>()
);
export const deleteLocation = createAction(
  '[App Page] Delete Location',
  props<{ locationid: any }>()
);