import { Component, Inject, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { WarehouseCustomerManagerService } from '../../warehouse-customer-manager.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment';
import { CustomerService } from 'app/customer/customer.service';
import { NotificationsService } from 'angular2-notifications';
import { Customer } from 'app/_shared/model/customer';
import { Store } from '@ngrx/store';
import * as fromCustomer from '../../state';
import { CustomerApiActions, CustomerPageActions } from '../../state/actions';
import { CustomerEffects } from '../../state/customer.effect';
import { Actions, ofType } from '@ngrx/effects';
import { AppService } from 'app/app.service';
import * as fromApp from 'app/_state';
@Component({
  selector: 'edit-customer-dialog',
  templateUrl: './edit-customer-dialog.component.html',
  styleUrls: ['./edit-customer-dialog.component.scss'],
})
export class EditCustomerDialogComponent implements OnInit, OnDestroy {
  //imageURL = environment.imageURL;
  showExtraToFields: boolean;
  customerForm: FormGroup;
  selectedCustomer: Customer;
  private _unsubscribeAll: Subject<any>;
  isSaving: boolean;
  businessID: any;
  business: any;
  user: any;
  objectKeys = Object.keys;
  @ViewChild('mainInput') mainInput: ElementRef;
  constructor(
    private appStore: Store<fromApp.State>,
    private store: Store<fromCustomer.State>,
    private _formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<EditCustomerDialogComponent>,
    private customerService: CustomerService,
    public appService: AppService,
    private notifyService: NotificationsService,
    private customerEffects: CustomerEffects,
    private readonly actions$: Actions,
    @Inject(MAT_DIALOG_DATA) private inputData: any,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.selectedCustomer = this.inputData;
    this.focusMainInput();
    this.appStore.select(fromApp.getCurrentBusiness)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(business => {
        if (business) {
          this.business = business;
        }
      });
    this.appStore.select(fromApp.getCurrentUser)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(user => {
        if (user) {
          this.user = user;
          this.customerForm = this.inviteCustomerForm();
        }
      });
    this.store.select(fromCustomer.getIsSaving)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(loading => {
        this.isSaving = loading
      });

    this.actions$
      .pipe(
        takeUntil(this._unsubscribeAll),
        ofType(CustomerApiActions.updateCustomerSuccess))
      .subscribe((data) => {
        this.matDialogRef.close(data);
      });

    this.actions$
      .pipe(
        takeUntil(this._unsubscribeAll),
        ofType(CustomerApiActions.createCustomerSuccess))
      .subscribe((data) => {
        this.matDialogRef.close(data);
      });
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  inviteCustomerForm(): FormGroup {
    return this._formBuilder.group({
      // customerID: [Number(this.selectedCustomer.customerID) || 0],
      companyName: [this.selectedCustomer?.companyName],
      businessID: [this.user?.businessID],
      email: [this.selectedCustomer.email],
      apEmail: [this.selectedCustomer.apEmail],
      createdBy: [this.user?.userID]
    });
  }
  save(): void {
    if (this.selectedCustomer.customerID) {
      this.edit();
    } else {
      this.create();
    }
  }
  focusMainInput(): void {

  }
  create(): void {
    this.store.dispatch(CustomerPageActions.createCustomer({ customer: this.customerForm.value }));
  }
  edit(): void {
    const dataToSend = this.customerForm.value;
    dataToSend.email = this.selectedCustomer.email;
    this.store.dispatch(CustomerPageActions.updateCustomer({ customer: dataToSend }));
  }
}
