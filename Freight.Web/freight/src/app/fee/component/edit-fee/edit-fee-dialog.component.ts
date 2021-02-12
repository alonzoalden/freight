import { Component, Inject, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { WarehouseFeeManagerService } from '../../warehouse-fee-manager.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment';
import { FeeService } from 'app/fee/fee.service';
import { NotificationsService } from 'angular2-notifications';
import { Fee } from 'app/_shared/model/fee';
import { Store } from '@ngrx/store';
import * as fromFee from '../../state';
import { FeeApiActions, FeePageActions } from '../../state/actions';
import { FeeEffects } from '../../state/fee.effect';
import { Actions, ofType } from '@ngrx/effects';
import { AppService } from 'app/app.service';
import * as fromApp from 'app/_state';
@Component({
  selector: 'edit-fee-dialog',
  templateUrl: './edit-fee-dialog.component.html',
  styleUrls: ['./edit-fee-dialog.component.scss'],
})
export class EditFeeDialogComponent implements OnInit, OnDestroy {
  //imageURL = environment.imageURL;
  showExtraToFields: boolean;
  feeForm: FormGroup;
  selectedFee: Fee;
  private _unsubscribeAll: Subject<any>;
  isSaving: boolean;
  businessID: any;

  objectKeys = Object.keys;
  @ViewChild('mainInput') mainInput: ElementRef;
  constructor(
    private appStore: Store<fromApp.State>,
    private store: Store<fromFee.State>,
    private _formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<EditFeeDialogComponent>,
    private feeService: FeeService,
    public appService: AppService,
    private notifyService: NotificationsService,
    private feeEffects: FeeEffects,
    private readonly actions$: Actions,
    @Inject(MAT_DIALOG_DATA) private inputData: any,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.selectedFee = this.inputData;
    this.focusMainInput();
    
    this.appStore.select(fromApp.getCurrentBusinessEntityId)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(businessid => {
      this.businessID = businessid;
      this.feeForm = this.createFeeForm();
      });


    this.store.select(fromFee.getIsSaving)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(loading => {
        this.isSaving = loading
      });

    this.actions$
      .pipe(
        takeUntil(this._unsubscribeAll),
        ofType(FeeApiActions.updateFeeSuccess))
      .subscribe((data) => {
        this.matDialogRef.close(data);
      });

    this.actions$
      .pipe(
        takeUntil(this._unsubscribeAll),
        ofType(FeeApiActions.createFeeSuccess))
      .subscribe((data) => {
        this.matDialogRef.close(data);
      });
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  createFeeForm(): FormGroup {
    return this._formBuilder.group({
      feeID: [this.selectedFee.feeID || 0],
      businessID: [this.businessID],
      feeType: [this.selectedFee.feeType],
      feeAmount: [this.selectedFee.feeAmount],
      description: [this.selectedFee.description],
    });
  }
  save(): void {
    if (this.selectedFee.feeID) {
      this.edit();
    } else {
      this.create();
    }
  }
  focusMainInput(): void {
    
  }
  create(): void {
    this.store.dispatch(FeePageActions.createFee({ fee: this.feeForm.value }));
  }
  edit(): void {
    this.store.dispatch(FeePageActions.updateFee({ fee: this.feeForm.value }));
  }
}
