import { createAction, props } from '@ngrx/store';
import { Location } from 'app/_shared/model/location';

export const loadLocationsListSuccess = createAction(
  '[Location API] Load Locations List Success',
  props<{ locations: Location[] }>()
);
export const loadLocationsListFailure = createAction(
  '[Location API] Load Locations List Fail',
  props<{ error: string }>()
);

export const getLocationSuccess = createAction(
  '[Location API] Get Location Success',
  props<{ location: Location }>()
);
export const getLocationFailure = createAction(
  '[Location API] Get Location Fail',
  props<{ error: string }>()
);

export const updateLocationSuccess = createAction(
  '[Location API] Update Location Success',
  props<{ location: Location }>()
);
export const updateLocationFailure = createAction(
  '[Location API] Update Location Fail',
  props<{ error: string }>()
);

export const createLocationSuccess = createAction(
  '[Location API] Create Location Success',
  props<{ location: Location }>()
);
export const createLocationFailure = createAction(
  '[Location API] Create Location Fail',
  props<{ error: string }>()
);
export const deleteLocationSuccess = createAction(
  '[Location API] Delete Location Success',
  props<{ locationid: any }>()
);
export const deleteLocationFailure = createAction(
  '[Location API] Delete Location Fail',
  props<{ error: string }>()
);