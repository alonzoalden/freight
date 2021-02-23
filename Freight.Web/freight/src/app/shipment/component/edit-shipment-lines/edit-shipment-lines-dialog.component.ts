import { Component, Inject, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShipment from '../../state';
import { ShipmentApiActions, ShipmentPageActions } from '../../state/actions';
import { Actions, ofType } from '@ngrx/effects';
import { Shipment, ShipmentLine } from '../../../_shared/model/shipment';
import { AppService } from 'app/app.service';
import { MediaObserver } from '@angular/flex-layout';
import { fuseAnimations } from '@fuse/animations';
import { Item } from 'app/_shared/model/item';
import * as fromApp from 'app/_state';

@Component({
  selector: 'edit-shipment-lines-dialog',
  templateUrl: './edit-shipment-lines-dialog.component.html',
  styleUrls: ['./edit-shipment-lines-dialog.component.scss'],
  animations: fuseAnimations
})
export class EditShipmentLinesDialogComponent implements OnInit, OnDestroy {
  //imageURL = environment.imageURL;
  shipmentLineForm: FormGroup;
  selectedShipment: Shipment;
  selectedShipmentLine: ShipmentLine;
  lines: any;
  isSaving: boolean;
  isLoading: boolean;
  composeForm: any;
  private _unsubscribeAll: Subject<any>;
  objectKeys = Object.keys;
  constructor(
    private store: Store<fromShipment.State>,
    private _formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<EditShipmentLinesDialogComponent>,
    public appService: AppService,
    private readonly actions$: Actions,
    public media: MediaObserver,
    private appStore: Store<fromApp.State>,
    @Inject(MAT_DIALOG_DATA) private inputData: any,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.selectedShipmentLine = this.inputData;
    this.appStore.select(fromApp.getCurrentBusinessEntityId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(businessID => {
        this.store.dispatch(ShipmentPageActions.loadItemList({ businessID }));
      });
    this.store.select(fromShipment.getSelectedShipment)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.selectedShipment = data;
      });

    this.store.select(fromShipment.getItemList)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((lines: Item[]) => {
        this.lines = lines;
        this.shipmentLineForm = this.createShipmentLineForm();
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
        ofType(ShipmentApiActions.createShipmentLineSuccess))
      .subscribe((data) => {
        this.matDialogRef.close(data);
      });
    this.actions$
      .pipe(
        takeUntil(this._unsubscribeAll),
        ofType(ShipmentApiActions.editShipmentLineSuccess))
      .subscribe((data) => {
        this.matDialogRef.close(data);
      });

  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  createShipmentLineForm(): FormGroup {
    return this._formBuilder.group({
      shipmentLineID: [this.selectedShipmentLine.shipmentLineID],
      shipmentID: [this.selectedShipment.shipmentID],
      itemID: [this.selectedShipmentLine.itemID],
      quantity: [this.selectedShipmentLine.quantity],
      unitPrice: [this.selectedShipmentLine.unitPrice],
      itemName: [this.selectedShipmentLine.itemItemName],
      itemNumber: [this.selectedShipmentLine.itemItemNumber],
      htsCode: [this.selectedShipmentLine.itemHTSCode],
      line: [this.lines?.find(i => i.itemID == this.selectedShipmentLine.itemID)]
    });
  }
  updateForm(): void {
    const line = this.shipmentLineForm.controls['line'].value;
    this.shipmentLineForm.controls.itemID.setValue(line.itemID);
    this.shipmentLineForm.controls.itemName.setValue(line.itemName);
    this.shipmentLineForm.controls.unitPrice.setValue(line.unitPrice);
    this.shipmentLineForm.controls.itemNumber.setValue(line.itemNumber);
    this.shipmentLineForm.controls.htsCode.setValue(line.htsCode);
  }
  
  onSave(): void {
    if (this.selectedShipmentLine.shipmentLineID) {
      this.edit();
    } else {
      this.save();
    }
  }

  save(): void {
    this.updateForm();
    this.store.dispatch(ShipmentPageActions.createShipmentLine({ shipmentLine: this.shipmentLineForm.value }));
    // this.isSaving = true;
    // this.shipmentService.createShipment(this.shipmentLineForm.value)
    //   .subscribe(
    //     (data: ShipmentLine) => {
    //       this.isSaving = false;
    //       if (close) {
    //         this.matDialogRef.close(data);
    //       }
    //       this.notifyService.success('Success', `${data.shipmentLineID} has been updated.`, { timeOut: 2000, clickToClose: true });
    //     },
    //     error => {
    //       this.notifyService.error('Error', `${error}`, { clickToClose: true });
    //       this.isSaving = false;
    //     }
    //   );
  }
  edit(): void {
    
    this.store.dispatch(ShipmentPageActions.editShipmentLine({ shipmentLine: this.shipmentLineForm.value }));

    // this.isSaving = true;

    // this.shipmentService.editShipmentLine(this.shipmentLineForm.value)
    //   .subscribe(
    //     (data: ShipmentLine) => {
    //       if (close) {
    //         this.matDialogRef.close(data);
    //       }
    //       this.notifyService.success('Success', `${data.shipmentLineID} has been updated.`, { timeOut: 2000, clickToClose: true });
    //     },
    //     error => {
    //       this.notifyService.error('Error', `${error}`, { clickToClose: true });
    //       this.isSaving = false;
    //     }
    //   );
  }

}
