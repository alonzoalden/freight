import { Component, Inject, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { WarehouseLocationManagerService } from '../../warehouse-location-manager.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment';
import { LocationService } from 'app/location/location.service';
import { NotificationsService } from 'angular2-notifications';
import { Location } from 'app/_shared/model/location';
import { Store } from '@ngrx/store';
import * as fromLocation from '../../state';
import { LocationApiActions, LocationPageActions } from '../../state/actions';
import { LocationEffects } from '../../state/location.effect';
import { Actions, ofType } from '@ngrx/effects';
import { AppService } from 'app/app.service';
import * as fromApp from 'app/_state';
@Component({
  selector: 'edit-location-dialog',
  templateUrl: './edit-location-dialog.component.html',
  styleUrls: ['./edit-location-dialog.component.scss'],
})
export class EditLocationDialogComponent implements OnInit, OnDestroy {
  //imageURL = environment.imageURL;
  showExtraToFields: boolean;
  locationForm: FormGroup;
  selectedLocation: Location;
  private _unsubscribeAll: Subject<any>;
  isSaving: boolean;
  businessID: any;

  objectKeys = Object.keys;
  @ViewChild('mainInput') mainInput: ElementRef;
  constructor(
    private appStore: Store<fromApp.State>,
    private store: Store<fromLocation.State>,
    private _formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<EditLocationDialogComponent>,
    private locationService: LocationService,
    public appService: AppService,
    private notifyService: NotificationsService,
    private locationEffects: LocationEffects,
    private readonly actions$: Actions,
    @Inject(MAT_DIALOG_DATA) private inputData: any,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.selectedLocation = this.inputData;
    this.focusMainInput();
    this.appStore.select(fromApp.getCurrentBusinessEntityId)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(businessid => {
      this.businessID = businessid;
      this.locationForm = this.createLocationForm();
      });

    this.store.select(fromLocation.getIsSaving)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(loading => {
        this.isSaving = loading
      });

    this.actions$
      .pipe(
        takeUntil(this._unsubscribeAll),
        ofType(LocationApiActions.updateLocationSuccess))
      .subscribe((data) => {
        this.matDialogRef.close(data);
      });

    this.actions$
      .pipe(
        takeUntil(this._unsubscribeAll),
        ofType(LocationApiActions.createLocationSuccess))
      .subscribe((data) => {
        this.matDialogRef.close(data);
      });
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  createLocationForm(): FormGroup {
    return this._formBuilder.group({
      locationID: [Number(this.selectedLocation.locationID) || 0],
      businessID: [this.businessID],
      locationName: [this.selectedLocation.locationName],
    });
  }
  save(): void {
    if (this.selectedLocation.locationID) {
      this.edit();
    } else {
      this.create();
    }
  }
  focusMainInput(): void {
    
  }
  create(): void {
    this.store.dispatch(LocationPageActions.createLocation({ location: this.locationForm.value }));
  }
  edit(): void {
    this.store.dispatch(LocationPageActions.updateLocation({ location: this.locationForm.value }));
  }
}
