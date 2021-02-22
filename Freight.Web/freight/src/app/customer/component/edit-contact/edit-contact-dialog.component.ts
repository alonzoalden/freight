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
import { Contact, Customer } from 'app/_shared/model/customer';
import { Store } from '@ngrx/store';
import * as fromCustomer from '../../state';
import { CustomerApiActions, CustomerPageActions } from '../../state/actions';
import { CustomerEffects } from '../../state/customer.effect';
import { Actions, ofType } from '@ngrx/effects';
import { AppService } from 'app/app.service';
import * as fromApp from 'app/_state';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'edit-contact-dialog',
  templateUrl: './edit-contact-dialog.component.html',
  styleUrls: ['./edit-contact-dialog.component.scss'],
})
export class EditContactDialogComponent implements OnInit, OnDestroy {
  //imageURL = environment.imageURL;
  showExtraToFields: boolean;
  contactForm: FormGroup;
  selectedContact: Contact;
  selectedCustomer: Customer;
  private _unsubscribeAll: Subject<any>;
  isSaving: boolean;
  businessID: any;
  dataSource: any = new MatTableDataSource();

  displayedColumns = ['fullName', 'email', 'title', 'actions'];

  objectKeys = Object.keys;
  @ViewChild('mainInput') mainInput: ElementRef;
  constructor(
    private appStore: Store<fromApp.State>,
    private store: Store<fromCustomer.State>,
    private _formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<EditContactDialogComponent>,
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
    
    this.selectedContact = this.inputData;
    this.focusMainInput();
    
    this.store.dispatch(CustomerPageActions.loadContactList({ customerid: this.selectedContact.customerID }));
    this.appStore.select(fromApp.getCurrentBusinessEntityId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(businessid => {
        this.businessID = businessid;
      });

    this.store.select(fromCustomer.getIsSaving)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(loading => {
        this.isSaving = loading
      });

    this.store.select(fromCustomer.getSelectedcustomer)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(customer => {
        this.selectedCustomer = customer
        this.contactForm = this.inviteContactForm();
      });

    this.store.select(fromCustomer.getContactList)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.dataSource = new MatTableDataSource<any>(data);
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
        this.dataSource.data.push(data);
      });
      
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  inviteContactForm(): FormGroup {
    return this._formBuilder.group({
      //contactID: [Number(this.selectedContact.contactID)],
      customerID: [this.selectedCustomer.customerID],
      businessID: [this.selectedCustomer.businessID],
      fullName: [],
      email: [],
      title: [],
      createdBy: [this.selectedContact.createdBy],
    });
  }
  save(): void {
    this.create();
  }
  focusMainInput(): void {
    
  }
  onSelect(): void {
    
  }
  onDelete(row): void {
    this.store.dispatch(CustomerPageActions.deleteContact({ contact: row }));
  }
  create(): void {
    this.store.dispatch(CustomerPageActions.createContact({ contact: this.contactForm.value }));
  }
  edit(): void {
    const dataToSend = this.contactForm.value;
    dataToSend.email = this.selectedContact.email;
    this.store.dispatch(CustomerPageActions.updateContact({ contact: dataToSend }));
  }
}
