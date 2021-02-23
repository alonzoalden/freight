import { Component, Inject, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShipment from '../../state';
import { ShipmentApiActions, ShipmentPageActions } from '../../state/actions';
import { Actions, ofType } from '@ngrx/effects';
import { Shipment, ShipmentContact } from '../../../_shared/model/shipment';
import { AppService } from 'app/app.service';
import { MediaObserver } from '@angular/flex-layout';
import { fuseAnimations } from '@fuse/animations';
import * as fromApp from 'app/_state';
import { Contact } from 'app/_shared/model/customer';

@Component({
  selector: 'edit-shipment-contacts-dialog',
  templateUrl: './edit-shipment-contacts-dialog.component.html',
  styleUrls: ['./edit-shipment-contacts-dialog.component.scss'],
  animations: fuseAnimations
})
export class EditShipmentContactsDialogComponent implements OnInit, OnDestroy {
  //imageURL = environment.imageURL;
  shipmentContactForm: FormGroup;
  selectedShipment: Shipment;
  selectedShipmentContact: ShipmentContact;
  contacts: any;
  isSaving: boolean;
  isLoading: boolean;
  composeForm: any;
  private _unsubscribeAll: Subject<any>;
  objectKeys = Object.keys;
  constructor(
    private store: Store<fromShipment.State>,
    private _formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<EditShipmentContactsDialogComponent>,
    public appService: AppService,
    private readonly actions$: Actions,
    public media: MediaObserver,
    private appStore: Store<fromApp.State>,
    @Inject(MAT_DIALOG_DATA) private inputData: any,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.selectedShipmentContact = this.inputData;

    this.appStore.select(fromApp.getCurrentBusinessEntityId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(businessID => {
      });
    this.store.select(fromShipment.getSelectedShipment)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.selectedShipment = data
        if (data.customerID) {
          this.store.dispatch(ShipmentPageActions.loadContactList({ customerID: this.selectedShipment.customerID }));
        }
      });
    this.store.select(fromShipment.getContactList)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
        this.shipmentContactForm = this.createShipmentContactForm();
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

    this.store.select(fromShipment.getIsSaving)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(loading => {
        this.isSaving = loading
      });

    this.actions$
      .pipe(
        takeUntil(this._unsubscribeAll),
        ofType(ShipmentApiActions.editShipmentContactSuccess))
      .subscribe((data) => {
        this.matDialogRef.close(data);
      });
    this.actions$
      .pipe(
        takeUntil(this._unsubscribeAll),
        ofType(ShipmentApiActions.createShipmentContactSuccess))
      .subscribe((data) => {
        this.matDialogRef.close(data);
      });

  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  createShipmentContactForm(): FormGroup {
    return this._formBuilder.group({
      shipmentContactID: [Number(this.selectedShipmentContact.shipmentContactID)],
      businessID: [this.selectedShipment.businessID],
      shipmentID: [this.selectedShipment.shipmentID],
      contactID: [],
      createdBy: [this.selectedShipment.createdBy],
      email: [],
      firstName: [],
      lastName: [],
      contact: [this.contacts?.find(i => i.shipmentContactID == this.selectedShipmentContact.shipmentContactID)]
    });
  }
  onSave(): void {
    if (this.selectedShipmentContact.shipmentContactID) {
      this.edit();
    } else {
      this.save();
    }
  }
  save(): void {
    this.store.dispatch(ShipmentPageActions.createShipmentContact({ shipmentContact: this.shipmentContactForm.value }));
  }
  edit(): void {
    this.store.dispatch(ShipmentPageActions.editShipmentContact({ shipmentContact: this.shipmentContactForm.value }));
  }

}
