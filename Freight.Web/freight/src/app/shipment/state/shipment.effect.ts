import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationsService } from 'angular2-notifications';
import { ShipmentContact, ShipmentFee, ShipmentLine, ShipmentPackage } from 'app/_shared/model/shipment';

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
        concatMap(action => this.shipmentService.getShipmentList(action.businessID)
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

  editShipmentPackage$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.editShipmentPackage),
        concatMap(action => this.shipmentService.editShipmentPackage(action.shipmentPackage)
          .pipe(
            map((shipmentPackage: ShipmentPackage) => {
              this.notifyService.success('Success', `${shipmentPackage.shipmentPackageID} has been updated.`, { timeOut:3500, clickToClose: true });
              return ShipmentApiActions.editShipmentPackageSuccess({ shipmentPackage });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.editShipmentPackageFailure({ error }))
            })
          )
        )
      );
  });
  editShipmentLine$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.editShipmentLine),
        concatMap(action => this.shipmentService.editShipmentLine(action.shipmentLine)
          .pipe(
            map((shipmentLine: ShipmentLine) => {
              this.notifyService.success('Success', `${shipmentLine.shipmentLineID} has been updated.`, { timeOut:3500, clickToClose: true });
              return ShipmentApiActions.editShipmentLineSuccess({ shipmentLine });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.editShipmentLineFailure({ error }))
            })
          )
        )
      );
  });
  editShipmentFee$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.editShipmentFee),
        concatMap(action => this.shipmentService.editShipmentFee(action.shipmentFee)
          .pipe(
            map((shipmentFee: ShipmentFee) => {
              this.notifyService.success('Success', `${shipmentFee.shipmentFeeID} has been updated.`, { timeOut:3500, clickToClose: true });
              return ShipmentApiActions.editShipmentFeeSuccess({ shipmentFee });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.editShipmentFeeFailure({ error }))
            })
          )
        )
      );
  });
  editShipmentContact$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.editShipmentContact),
        concatMap(action => this.shipmentService.editShipmentContact(action.shipmentContact)
          .pipe(
            map((shipmentContact: ShipmentContact) => {
              this.notifyService.success('Success', `${shipmentContact.shipmentContactID} has been updated.`, { timeOut:3500, clickToClose: true });
              return ShipmentApiActions.editShipmentContactSuccess({ shipmentContact });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.editShipmentContactFailure({ error }))
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
            map(() => {
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
  deleteShipmentLine$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.deleteShipmentLine),
        concatMap(action => this.shipmentService.deleteShipmentLine(action.shipmentLineID)
          .pipe(
            map(() => {
              this.notifyService.success('Success', `Shipment Line has been removed.`, { timeOut:3500, clickToClose: true });
              return ShipmentApiActions.deleteShipmentLineSuccess({ shipmentLineID: action.shipmentLineID });
            }),
            catchError(error => {
              console.log(error)
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.deleteShipmentLineFailure({ error }))
            })
          )
        )
      );
  });
  deleteShipmentFee$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.deleteShipmentFee),
        concatMap(action => this.shipmentService.deleteShipmentFee(action.shipmentFeeID)
          .pipe(
            map((ShipmentPackage) => {
              this.notifyService.success('Success', `Shipment Fee has been removed.`, { timeOut:3500, clickToClose: true });
              return ShipmentApiActions.deleteShipmentFeeSuccess({ shipmentFeeID: action.shipmentFeeID });
            }),
            catchError(error => {
              console.log(error)
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.deleteShipmentFeeFailure({ error }))
            })
          )
        )
      );
  });

  loadFeeList$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.loadFeeList),
        concatMap(action => this.shipmentService.getFeeList(action.businessID)
          .pipe(
            map(fees => ShipmentApiActions.loadFeesListSuccess({ fees })),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.loadFeesListFailure({ error }))
            })
          )
        )
      );
  });
  
  loadContactLists$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.loadContactList),
        mergeMap(action => this.shipmentService.getContactList(action.businessID)
          .pipe(
            map(contacts => ShipmentApiActions.loadContactsListSuccess({ contacts })),
            catchError(error => {
              //this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.loadContactsListFailure({ error }))
            })
          )
        )
      );
  });

  loadItemLists$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.loadItemList),
        mergeMap(action => this.shipmentService.getItemList(action.businessID)
          .pipe(
            map(items => ShipmentApiActions.loadItemsListSuccess({ items })),
            catchError(error => {
              //this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.loadItemsListFailure({ error }))
            })
          )
        )
      );
  });
  
}
