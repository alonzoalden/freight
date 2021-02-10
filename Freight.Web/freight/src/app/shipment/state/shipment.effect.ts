import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationsService } from 'angular2-notifications';

import { of } from 'rxjs';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';

import { ShipmentService } from '../shipment.service';
import { ShipmentPageActions, ShipmentApiActions } from './actions';

@Injectable()
export class ShipmentEffects {

  constructor(private actions$: Actions, private shipmentService: ShipmentService, private notifyService: NotificationsService) { }

  loadShipmentList$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.loadShipmentList),
        concatMap(action => this.shipmentService.getAllShipmentsList()
          .pipe(
            map(shipments => ShipmentApiActions.loadShipmentsListSuccess({ shipments })),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.loadShipmentsListFailure({ error }))
            })
          )
        )
      );
  });

  updateShipment$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.updateShipment),
        concatMap(action => this.shipmentService.updateShipment(action.shipment)
          .pipe(
            map((shipment) => {
              this.notifyService.success('Success', `${shipment.shipmentID} has been updated.`, { timeOut:3500, clickToClose: true });
              return ShipmentApiActions.updateShipmentSuccess({ shipment });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.updateShipmentFailure({ error }))
            })
          )
        )
      );
  });

  deleteShipmentPackage$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.deleteShipmentPackage),
        concatMap(action => this.shipmentService.deleteShipmentPackage(action.shipmentPackageID)
          .pipe(
            map((ShipmentPackage) => {
              this.notifyService.success('Success', `Shipment Package has been removed.`, { timeOut:3500, clickToClose: true });
              return ShipmentApiActions.deleteShipmentPackageSuccess({ shipmentPackageID: action.shipmentPackageID });
            }),
            catchError(error => {
              console.log(error)
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.deleteShipmentPackageFailure({ error }))
            })
          )
        )
      );
  });
}
