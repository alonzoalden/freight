import { Component, Inject, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { WarehouseBusinessManagerService } from '../../warehouse-business-manager.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment';
import { BusinessService } from 'app/business/business.service';
import { NotificationsService } from 'angular2-notifications';
import { Business } from 'app/_shared/model/business';
import { Store } from '@ngrx/store';
import * as fromBusiness from '../../state';
import { BusinessApiActions, BusinessPageActions } from '../../state/actions';
import { BusinessEffects } from '../../state/business.effect';
import { Actions, ofType } from '@ngrx/effects';
import { AppService } from 'app/app.service';

@Component({
  selector: 'edit-business-dialog',
  templateUrl: './edit-business-dialog.component.html',
  styleUrls: ['./edit-business-dialog.component.scss'],
})
export class EditBusinessDialogComponent implements OnInit, OnDestroy {
  //imageURL = environment.imageURL;
  showExtraToFields: boolean;
  businessForm: FormGroup;
  selectedBusiness: Business;
  private _unsubscribeAll: Subject<any>;
  isSaving: boolean;

  objectKeys = Object.keys;
  @ViewChild('mainInput') mainInput: ElementRef;
  constructor(
    private store: Store<fromBusiness.State>,
    private _formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<EditBusinessDialogComponent>,
    private businessService: BusinessService,
    public appService: AppService,
    private notifyService: NotificationsService,
    private businessEffects: BusinessEffects,
    private readonly actions$: Actions,
    @Inject(MAT_DIALOG_DATA) private inputData: any,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.selectedBusiness = this.inputData;
    this.businessForm = this.createBusinessForm();
    this.focusMainInput();

    this.store.select(fromBusiness.getIsSaving)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(loading => {
        this.isSaving = loading
      });

    this.actions$
      .pipe(
        takeUntil(this._unsubscribeAll),
        ofType(BusinessApiActions.updateBusinessSuccess))
      .subscribe((data) => {
        this.matDialogRef.close(data);
      });

    this.actions$
      .pipe(
        takeUntil(this._unsubscribeAll),
        ofType(BusinessApiActions.createBusinessSuccess))
      .subscribe((data) => {
        this.matDialogRef.close(data);
      });
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  createBusinessForm(): FormGroup {
    return this._formBuilder.group({
      businessID: [Number(this.selectedBusiness.businessID)],
      userID: [Number(this.selectedBusiness.userID)],
      companyName: [this.selectedBusiness.companyName],
      isShipper: [this.selectedBusiness.isShipper],
      is3PL: [this.selectedBusiness.is3PL],
      isFFW: [this.selectedBusiness.isFFW],
    });
  }
  save(): void {
    if (this.selectedBusiness.businessID) {
      this.edit();
    } else {
      this.create();
    }
  }
  focusMainInput(): void {
    
  }
  create(): void {
    this.store.dispatch(BusinessPageActions.createBusiness({ business: this.businessForm.value }));
  }
  edit(): void {
    this.store.dispatch(BusinessPageActions.updateBusiness({ business: this.businessForm.value }));
  }
}
