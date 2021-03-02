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
              return of(ShipmentApiActions.loadShipmentsListFailure({ error }));
            })
          )
        )
      );
  });

  createShipment$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.createShipment),
        concatMap(action => this.shipmentService.createShipment(action.shipment)
          .pipe(
            map((shipment) => {
              this.notifyService.success('Success', `${shipment.shipmentID} has been created.`, { timeOut:3500, clickToClose: true });
              return ShipmentApiActions.createShipmentSuccess({ shipment });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.createShipmentFailure({ error }))
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
              // this.notifyService.success('Success', `${shipment.shipmentID} has been updated.`, { timeOut:3500, clickToClose: true });
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

  deleteShipment$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.deleteShipment),
        concatMap(action => this.shipmentService.deleteShipment(action.shipmentID)
          .pipe(
            map(() => {
              this.notifyService.success('Success', `${action.shipmentID} has been removed.`, { timeOut:3500, clickToClose: true });
              return ShipmentApiActions.deleteShipmentSuccess({ shipmentID: action.shipmentID });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.deleteShipmentFailure({ error }))
            })
          )
        )
      );
  });

  createShipmentLine$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.createShipmentLine),
        concatMap(action => this.shipmentService.createShipmentLine(action.shipmentLine)
          .pipe(
            map((shipmentLine: ShipmentLine) => {
              this.notifyService.success('Success', `Line has been created.`, { timeOut:3500, clickToClose: true });
              return ShipmentApiActions.createShipmentLineSuccess({ shipmentLine });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.createShipmentLineFailure({ error }))
            })
          )
        )
      );
  });
  createShipmentPackage$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.createShipmentPackage),
        concatMap(action => this.shipmentService.createShipmentPackage(action.shipmentPackage)
          .pipe(
            map((shipmentPackage: ShipmentPackage) => {
              this.notifyService.success('Success', `Package has been created.`, { timeOut:3500, clickToClose: true });
              return ShipmentApiActions.createShipmentPackageSuccess({ shipmentPackage });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.createShipmentPackageFailure({ error }))
            })
          )
        )
      );
  });
  createShipmentFee$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.createShipmentFee),
        concatMap(action => this.shipmentService.createShipmentFee(action.shipmentFee)
          .pipe(
            map((shipmentFee: ShipmentFee) => {
              this.notifyService.success('Success', `Fee has been created.`, { timeOut:3500, clickToClose: true });
              return ShipmentApiActions.createShipmentFeeSuccess({ shipmentFee });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.createShipmentFeeFailure({ error }))
            })
          )
        )
      );
  });
  createShipmentContact$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.createShipmentContact),
        concatMap(action => this.shipmentService.createShipmentContact(action.shipmentContact)
          .pipe(
            map((shipmentContact: ShipmentContact) => {
              this.notifyService.success('Success', `Contact has been created.`, { timeOut:3500, clickToClose: true });
              return ShipmentApiActions.createShipmentContactSuccess({ shipmentContact });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.createShipmentContactFailure({ error }))
            })
          )
        )
      );
  });
  createShipmentComment$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.createShipmentComment),
        concatMap(action => this.shipmentService.createShipmentComment(action.shipmentComment)
          .pipe(
            map((shipmentComment: any) => {
              this.notifyService.success('Success', `Comment has been created.`, { timeOut:3500, clickToClose: true });
              return ShipmentApiActions.createShipmentCommentSuccess({ shipmentComment });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.createShipmentCommentFailure({ error }))
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
              this.notifyService.success('Success', `${shipmentLine.itemItemName} has been updated.`, { timeOut:3500, clickToClose: true });
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
              this.notifyService.success('Success', `${shipmentFee.feeFeeType} has been updated.`, { timeOut:3500, clickToClose: true });
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
              this.notifyService.success('Success', `${shipmentContact.contactEmail} has been updated.`, { timeOut:3500, clickToClose: true });
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
  editShipmentComment$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.editShipmentComment),
        concatMap(action => this.shipmentService.editShipmentComment(action.shipmentComment)
          .pipe(
            map((shipmentComment: any) => {
              this.notifyService.success('Success', `Comment has been updated.`, { timeOut:3500, clickToClose: true });
              return ShipmentApiActions.editShipmentCommentSuccess({ shipmentComment });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.editShipmentCommentFailure({ error }))
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
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.deleteShipmentFeeFailure({ error }))
            })
          )
        )
      );
  });
  deleteShipmentContact$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.deleteShipmentContact),
        concatMap(action => this.shipmentService.deleteShipmentContact(action.shipmentContactID)
          .pipe(
            map((ShipmentPackage) => {
              this.notifyService.success('Success', `Shipment Contact has been removed.`, { timeOut:3500, clickToClose: true });
              return ShipmentApiActions.deleteShipmentContactSuccess({ shipmentContactID: action.shipmentContactID });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.deleteShipmentContactFailure({ error }))
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
              // this.notifyService.error('Error', `${error}`, { clickToClose: true });
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
        mergeMap(action => this.shipmentService.getContactList(action.customerID)
          .pipe(
            map(contacts => ShipmentApiActions.loadContactsListSuccess({ contacts })),
            catchError(error => {
              // this.notifyService.error('Error', `${error}`, { clickToClose: true });
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

  load3plLists$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.get3pl),
        mergeMap(action => this.shipmentService.get3plList()
          .pipe(
            map(threePL => {
              return ShipmentApiActions.get3plSuccess({ threePL })
            }),
            catchError(error => {
              // this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.get3plFailure({ error }))
            })
          )
        )
      );
  });
  loadFFWLists$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.getFfw),
        mergeMap(action => this.shipmentService.getFFWList()
          .pipe(
            map(ffw => ShipmentApiActions.getFfwSuccess({ ffw })),
            catchError(error => {
              // this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.getFfwFailure({ error }))
            })
          )
        )
      );
  });
  loadShipperLists$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.getShippers),
        mergeMap(action => this.shipmentService.getShipperList()
          .pipe(
            map(shippers => ShipmentApiActions.getShippersSuccess({ shippers })),
            catchError(error => {
              // this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.getShipperFailure({ error }))
            })
          )
        )
      );
  });
  loadCustomersList$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.getCustomers),
        mergeMap(action => this.shipmentService.getCustomerList(action.businessID)
          .pipe(
            map(customers => ShipmentApiActions.getCustomersSuccess({ customers })),
            catchError(error => {
              // this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.getCustomersFailure({ error }))
            })
          )
        )
      );
  });

  loadShipmentLineList$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.loadShipmentLineList),
        mergeMap(action => this.shipmentService.getShipmentLineList(action.shipmentID)
          .pipe(
            map(shipmentLines => ShipmentApiActions.loadShipmentLineListSuccess({ shipmentLines })),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.loadShipmentLineListFailure({ error }))
            })
          )
        )
      );
  });

  loadShipmentPackagesList$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.loadShipmentPackageList),
        mergeMap(action => this.shipmentService.getShipmentPackageList(action.shipmentID)
          .pipe(
            map(shipmentPackages => ShipmentApiActions.loadShipmentPackageListSuccess({ shipmentPackages })),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.loadShipmentPackageListFailure({ error }))
            })
          )
        )
      );
  });
  loadShipmentFeeList$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.loadShipmentFeeList),
        mergeMap(action => this.shipmentService.getShipmentFeeList(action.shipmentID)
          .pipe(
            map(shipmentFee => ShipmentApiActions.loadShipmentFeeListSuccess({ shipmentFee })),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.loadShipmentFeeListFailure({ error }))
            })
          )
        )
      );
  });
  loadShipmentContactList$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.loadShipmentContactList),
        mergeMap(action => this.shipmentService.getShipmentContactList(action.shipmentID)
          .pipe(
            map(shipmentContacts => ShipmentApiActions.loadShipmentContactListSuccess({ shipmentContacts })),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.loadShipmentContactListFailure({ error }))
            })
          )
        )
      );
  });
  loadShipmentCommentList$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.loadShipmentCommentList),
        mergeMap(action => this.shipmentService.getShipmentCommentList(action.shipmentID)
          .pipe(
            map(shipmentComments => ShipmentApiActions.loadShipmentCommentListSuccess({ shipmentComments })),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.loadShipmentCommentListFailure({ error }))
            })
          )
        )
      );
  });
  loadLocationsSuccess$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ShipmentPageActions.getLocations),
        mergeMap(action => this.shipmentService.getLocationsList(action.businessID)
          .pipe(
            map(locations => ShipmentApiActions.getLocationsSuccess({ locations })),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ShipmentApiActions.getLocationsFailure({ error }))
            })
          )
        )
      );
  });
  
}





