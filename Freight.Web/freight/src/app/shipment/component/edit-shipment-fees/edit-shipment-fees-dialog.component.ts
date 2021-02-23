import { Component, Inject, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShipment from '../../state';
import { ShipmentApiActions, ShipmentPageActions } from '../../state/actions';
import { Actions, ofType } from '@ngrx/effects';
import { Shipment } from '../../../_shared/model/shipment';
import { AppService } from 'app/app.service';
import { MediaObserver } from '@angular/flex-layout';
import { fuseAnimations } from '@fuse/animations';
import { Fee } from 'app/_shared/model/fee';
import * as fromApp from 'app/_state';
@Component({
  selector: 'edit-shipment-fees-dialog',
  templateUrl: './edit-shipment-fees-dialog.component.html',
  styleUrls: ['./edit-shipment-fees-dialog.component.scss'],
  animations: fuseAnimations
})
export class EditShipmentFeesDialogComponent implements OnInit, OnDestroy {
  //imageURL = environment.imageURL;
  shipmentFeeForm: FormGroup;
  selectedShipment: Shipment;
  selectedShipmentFee: any;
  fees: Fee[];
  isSaving: boolean;
  isLoading: boolean;
  composeForm: any;
  private _unsubscribeAll: Subject<any>;
  objectKeys = Object.keys;
  constructor(
    private store: Store<fromShipment.State>,
    private _formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<EditShipmentFeesDialogComponent>,
    public appService: AppService,
    private readonly actions$: Actions,
    public media: MediaObserver,
    private appStore: Store<fromApp.State>,
    @Inject(MAT_DIALOG_DATA) private inputData: any,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.selectedShipmentFee = this.inputData;
    this.appStore.select(fromApp.getCurrentBusinessEntityId)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(businessID => {
        this.store.dispatch(ShipmentPageActions.loadFeeList({ businessID }));
      });
      
      this.store.select(fromShipment.getSelectedShipment)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.selectedShipment = data;
        this.shipmentFeeForm = this.createShipmentFeeForm();
      });

    this.store.select(fromShipment.getFeeList)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((fees: Fee[]) => {
        this.fees = fees
      });
    this.store.select(fromShipment.getIsLoading)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(loading => {
        this.isLoading = loading
      });
    this.store.select(fromShipment.getIsSaving)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(loading => {
        this.isSaving = loading
      });

    this.actions$
      .pipe(
        takeUntil(this._unsubscribeAll),
        ofType(ShipmentApiActions.createShipmentFeeSuccess))
      .subscribe((data) => {
        this.matDialogRef.close(data);
      });
    this.actions$
      .pipe(
        takeUntil(this._unsubscribeAll),
        ofType(ShipmentApiActions.editShipmentFeeSuccess))
      .subscribe((data) => {
        this.matDialogRef.close(data);
      });
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  createShipmentFeeForm(): FormGroup {
    return this._formBuilder.group({
      shipmentFeeID: [Number(this.selectedShipmentFee.shipmentFeeID)],
      shipmentID: [this.selectedShipment.shipmentID],
      feeID: [this.selectedShipmentFee.feeID],
      feeAmount: [this.selectedShipmentFee.feeAmount],
      feeFeeType: [this.selectedShipmentFee.feeFeeType],
      description: [this.selectedShipmentFee.description],
      fee: [this.fees?.find(i => i.feeID == this.selectedShipmentFee.feeID)]
    });
  }
  updateForm(): void {
    const fee = this.fees.find(fee => fee.feeID == this.shipmentFeeForm.get('feeID').value)
    this.shipmentFeeForm.controls.feeAmount.setValue(fee.feeAmount);
  }
  onSave(): void {
    if (this.selectedShipmentFee.shipmentFeeID) {
      this.edit();
    } else {
      this.save();
    }
  }

  save(): void {
    this.matDialogRef.close(this.shipmentFeeForm.value);
    this.store.dispatch(ShipmentPageActions.createShipmentFee({ shipmentFee: this.shipmentFeeForm.value }));
  }
  edit(): void {
    this.store.dispatch(ShipmentPageActions.editShipmentFee({ shipmentFee: this.shipmentFeeForm.value }));
  }

}
