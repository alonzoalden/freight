import { Component, Inject, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShipment from '../../state';
import { ShipmentApiActions, ShipmentPageActions } from '../../state/actions';
import { Actions, ofType } from '@ngrx/effects';
import { Shipment, ShipmentPackage } from '../../../_shared/model/shipment';
import { AppService } from 'app/app.service';
import { MediaObserver } from '@angular/flex-layout';
import { fuseAnimations } from '@fuse/animations';
@Component({
  selector: 'edit-shipment-packages-dialog',
  templateUrl: './edit-shipment-packages-dialog.component.html',
  styleUrls: ['./edit-shipment-packages-dialog.component.scss'],
  animations: fuseAnimations
})
export class EditShipmentPackagesDialogComponent implements OnInit, OnDestroy {
  shipmentPackageForm: FormGroup;
  selectedShipment: Shipment;
  selectedShipmentPackage: ShipmentPackage;
  isSaving: boolean;  
  isLoading: boolean;
  composeForm: any;
  private _unsubscribeAll: Subject<any>;
  objectKeys = Object.keys;
  constructor(
    private store: Store<fromShipment.State>,
    private _formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<EditShipmentPackagesDialogComponent>,
    public appService: AppService,
    private readonly actions$: Actions,
    public media: MediaObserver,
    @Inject(MAT_DIALOG_DATA) private inputData: any,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.selectedShipmentPackage = this.inputData;
    
    this.store.select(fromShipment.getIsSaving)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(loading => {
        this.isSaving = loading
      });
    this.store.select(fromShipment.getSelectedShipment)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.selectedShipment = data;
        this.shipmentPackageForm = this.createshipmentPackageForm();
      });
    this.actions$
      .pipe(
        takeUntil(this._unsubscribeAll),
        ofType(ShipmentApiActions.editShipmentPackageSuccess))
      .subscribe((data) => {
        this.matDialogRef.close(data);
      });
    this.actions$
      .pipe(
        takeUntil(this._unsubscribeAll),
        ofType(ShipmentApiActions.createShipmentPackageSuccess))
      .subscribe((data) => {
        this.matDialogRef.close(data);
      });


  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  createshipmentPackageForm(): FormGroup {
    return this._formBuilder.group({
      shipmentPackageID: [this.selectedShipmentPackage.shipmentPackageID],
      businessID: [this.selectedShipment.businessID],
      shipmentID: [this.selectedShipment.shipmentID],
      status: [this.selectedShipmentPackage.status],
      packageNumber: [this.selectedShipmentPackage.packageNumber],
      dimension: [this.selectedShipmentPackage.dimension],
      weight: [this.selectedShipmentPackage.weight],
      weightUnit: [this.selectedShipmentPackage.weightUnit],
      shipmentPackageRateID: [this.selectedShipmentPackage.shipmentPackageRateID],
      shippingCarrierID: [this.appService.shippingCarriers[0].id],
      shippingServiceID: [this.appService.shippingServices[0].id],
      shippingPackageID: [this.selectedShipmentPackage.shippingPackageID],
      shippingRate: [this.selectedShipmentPackage.shippingRate],
      trackingNumber: [this.selectedShipmentPackage.trackingNumber],
      uspspicNumber: [this.selectedShipmentPackage.uspspicNumber],
      shippingLabelPath: [this.selectedShipmentPackage.shippingLabelPath || ''],
      shipDate: [this.selectedShipmentPackage.shipDate],
      isRated: [this.selectedShipmentPackage.isRated || false],
      isLabeled: [this.selectedShipmentPackage.isLabeled || false],
      isManual: [this.selectedShipmentPackage.isManual || false]
    });
  }
  onSave(): void {
    if (this.selectedShipmentPackage.shipmentPackageID) {
      this.edit();
    } else {
      this.save();
    }
  }

  save(): void {
    const data = {...this.shipmentPackageForm.value};
    data.shippingCarrierID = null;
    data.shippingServiceID = null;
    this.store.dispatch(ShipmentPageActions.createShipmentPackage({ shipmentPackage: data }));
  }
  edit(): void {
    const data = {...this.shipmentPackageForm.value};
    data.shippingCarrierID = null;
    data.shippingServiceID = null;
    this.store.dispatch(ShipmentPageActions.editShipmentPackage({ shipmentPackage: data }));
  }

}
