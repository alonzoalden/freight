import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { WarehouseItemManagerService } from '../../warehouse-item-manager.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from 'environments/environment';
import { NotificationsService } from 'angular2-notifications';
//import { Item } from 'app/_shared/model/item';
import { Store } from '@ngrx/store';
import * as fromShipment from '../../state';
import { ShipmentApiActions, ShipmentPageActions } from '../../state/actions';
import { ShipmentEffects } from '../../state/shipment.effect';
import { Actions, ofType } from '@ngrx/effects';
import { Shipment } from '../../../_shared/model/shipment';
import { ShipmentService } from '../../shipment.service';
import { AppService } from 'app/app.service';

@Component({
  selector: 'edit-shipment-dialog',
  templateUrl: './edit-shipment-dialog.component.html',
  styleUrls: ['./edit-shipment-dialog.component.scss'],
})
export class EditShipmentDialogComponent implements OnInit, OnDestroy {
  //imageURL = environment.imageURL;
  showExtraToFields: boolean;
  shipmentForm: FormGroup;
  selectedShipment: Shipment;
  private _unsubscribeAll: Subject<any>;
  isSaving: boolean;

  objectKeys = Object.keys;

  constructor(
    private store: Store<fromShipment.State>,
    private _formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<EditShipmentDialogComponent>,
    public appService: AppService,
    private shipmentService: ShipmentService,
    private notifyService: NotificationsService,
    private shipmentEffects: ShipmentEffects,
    private readonly actions$: Actions,
    @Inject(MAT_DIALOG_DATA) private inputData: any,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.selectedShipment = this.inputData;
    this.shipmentForm = this.createShipmentForm();
    this.store.select(fromShipment.getIsSaving)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(loading => {
        this.isSaving = loading
      });

    this.actions$
      .pipe(
        takeUntil(this._unsubscribeAll),
        ofType(ShipmentApiActions.updateShipmentSuccess))
      .subscribe((data) => {
        this.matDialogRef.close(data);
      });
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  createShipmentForm(): FormGroup {
    return this._formBuilder.group({
      shipmentID: [Number(this.selectedShipment.shipmentID) || 0],
      businessID: [Number(this.selectedShipment.businessID || 1)],
      shipperID: [Number(this.selectedShipment.shipperID || 2)],
      customerID: [Number(this.selectedShipment.customerID)],
      customer: [''],
      originFFW: [Number(this.selectedShipment.originFFW) || 0],
      origin3PL: [Number(this.selectedShipment.origin3PL) || 0],
      destinationFFW: [Number(this.selectedShipment.destinationFFW) || 0],
      destination3PL: [Number(this.selectedShipment.destination3PL) || 0],
      containerNumber: [this.selectedShipment.containerNumber],
      etd: [this.selectedShipment.etd],
      eta: [this.selectedShipment.eta],
      txl: [this.selectedShipment.txl],
      isfFiled: [this.selectedShipment.isfFiled],
      deliveryLocationID: [this.selectedShipment.deliveryLocationID],
      status: [this.selectedShipment.status],
      memo: [this.selectedShipment.memo],
      shipperReference: [this.selectedShipment.shipperReference],
      updatedBy: [this.selectedShipment.updatedBy],
      updatedOn: [this.selectedShipment.updatedOn],
      createdBy: [this.selectedShipment.createdBy],
      createdOn: [this.selectedShipment.createdOn],
    });
  }
  save(): void {
    if (this.selectedShipment.shipmentID) {
      this.edit();
    } else {
      this.create();
    }
  }

  create(): void {
    this.isSaving = true;
    this.shipmentService.createShipment(this.shipmentForm.value)
      .subscribe(
        (data: Shipment) => {
          this.matDialogRef.close(data);
          this.notifyService.success('Success', `${data.shipmentID} has been created.`, { timeOut: 3500, clickToClose: true });
        },
        error => {
          this.notifyService.error('Error', `${error}`, { clickToClose: true });
          this.isSaving = false;
        }
      );
  }
  edit(): void {
    this.store.dispatch(ShipmentPageActions.updateShipment({ shipment: this.shipmentForm.value }));

    // this.warehouseItemManagerService.updateItem(this.shipmentForm.value)
    //   .subscribe(
    //     (data: Item) => {
    //       // this.warehouseItemManagerService.onItemSelected.next(data);
    //       this.matDialogRef.close(data);
    //       this.notifyService.success('Success', `${data.itemNumber} has been updated.`, { timeOut:3500, clickToClose: true });
    //     },
    //     error => {
    //       this.notifyService.error('Error', `${error}`, { clickToClose: true });
    //       this.isSaving = false;
    //     }
    //   );
  }

}
