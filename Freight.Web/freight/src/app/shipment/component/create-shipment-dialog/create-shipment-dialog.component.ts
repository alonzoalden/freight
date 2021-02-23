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
  selector: 'create-shipment-dialog',
  templateUrl: './create-shipment-dialog.component.html',
  styleUrls: ['./create-shipment-dialog.component.scss'],
  animations: fuseAnimations
})
export class CreateShipmentDialogComponent implements OnInit, OnDestroy {
  //imageURL = environment.imageURL;
  form: FormGroup;
  selectedShipment: Shipment;
  selectedShipmentLine: ShipmentLine;
  lines: any;
  isSaving: boolean;
  isLoading: boolean;
  composeForm: any;
  businessID: any;
  shippers: any;
  userInfo: any;
  private _unsubscribeAll: Subject<any>;
  objectKeys = Object.keys;
  constructor(
    private store: Store<fromShipment.State>,
    private _formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<CreateShipmentDialogComponent>,
    public appService: AppService,
    private readonly actions$: Actions,
    public media: MediaObserver,
    private appStore: Store<fromApp.State>,
    @Inject(MAT_DIALOG_DATA) private inputData: any,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.appStore.select(fromApp.getCurrentUser)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(user => {
        this.userInfo = user;
        this.businessID = user.businessID;
        this.form = this.createform();
      });
    
    this.store.select(fromShipment.getSelectedShipment)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.selectedShipment = data;
      });

    this.store.select(fromShipment.getShippersList)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data: any[]) => {
        this.shippers = data;
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
        ofType(ShipmentApiActions.createShipmentSuccess))
      .subscribe((data) => {
        this.matDialogRef.close(data);
      });

  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  createform(): FormGroup {
    return this._formBuilder.group({
      shipmentID: [null],
      businessID: [this.userInfo?.businessID],
      shipperID: [],
      createdBy: [this.userInfo?.userID],
    });
  }
  onSave(): void {
    this.save();
  }

  save(): void {
    this.store.dispatch(ShipmentPageActions.createShipment({ shipment: this.form.value }));

  }
}
