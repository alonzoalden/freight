import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationsService } from 'angular2-notifications';

import { of } from 'rxjs';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';

import { LocationService } from '../location.service';
import { LocationPageActions, LocationApiActions } from './actions';

@Injectable()
export class LocationEffects {

  constructor(private actions$: Actions, private locationService: LocationService, private notifyService: NotificationsService) { }

  loadLocationList$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(LocationPageActions.loadLocationList),
        concatMap(action => this.locationService.getAllLocationList()
          .pipe(
            map(locations => LocationApiActions.loadLocationsListSuccess({ locations })),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(LocationApiActions.loadLocationsListFailure({ error }))
            })
          )
        )
      );
  });

  updateLocation$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(LocationPageActions.updateLocation),
        concatMap(action => this.locationService.updateLocation(action.location)
          .pipe(
            map((location) => {
              this.notifyService.success('Success', `${location.locationName} has been updated.`, { timeOut:3500, clickToClose: true });
              return LocationApiActions.updateLocationSuccess({ location });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(LocationApiActions.updateLocationFailure({ error }))
            })
          )
        )
      );
  });
  createLocation$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(LocationPageActions.createLocation),
        concatMap(action => this.locationService.createLocation(action.location)
          .pipe(
            map((location) => {
              this.notifyService.success('Success', `${location.locationName} has been updated.`, { timeOut:3500, clickToClose: true });
              return LocationApiActions.createLocationSuccess({ location });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(LocationApiActions.createLocationFailure({ error }))
            })
          )
        )
      );
  });
}
