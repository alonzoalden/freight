import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { WarehouseItemManagerService } from '../../warehouse-item-manager.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment';
import { ItemService } from 'app/item/item.service';
import { NotificationsService } from 'angular2-notifications';
import { Item } from 'app/_shared/model/item';
import { Store } from '@ngrx/store';
import * as fromItem from '../../item/state';
import * as fromApp from 'app/_state';
import { ItemApiActions, ItemPageActions } from '../../item/state/actions';
import { ItemEffects } from '../../item/state/item.effect';
import { Actions, ofType } from '@ngrx/effects';
import { AppService } from 'app/app.service';
import { User } from 'app/_shared/model/user';
import { Business } from 'app/_shared/model/business';

@Component({
  selector: 'create-company-dialog',
  templateUrl: './create-company-dialog.component.html',
  styleUrls: ['./create-company-dialog.component.scss'],
})
export class CreateCompanyDialogComponent implements OnInit, OnDestroy {
  //imageURL = environment.imageURL;
  currentUser: User;
  userForm: FormGroup;
  businessForm: FormGroup;
  selected: any;
  private _unsubscribeAll: Subject<any>;
  isSaving: boolean;

  objectKeys = Object.keys;

  constructor(
    private store: Store<fromItem.State>,
    private _formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<CreateCompanyDialogComponent>,
    private warehouseItemManagerService: ItemService,
    public appService: AppService,
    private notifyService: NotificationsService,
    private itemEffects: ItemEffects,
    private readonly actions$: Actions,
    @Inject(MAT_DIALOG_DATA) private inputData: any,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.selected = this.inputData;
    this.userForm = this.createUserForm();
    this.businessForm = this.createBusinessForm();

    // this.store.select(fromApp.getCurrentUser)
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe(user => {
    //     this.currentUser = user;
    //   });

    this.store.select(fromItem.getIsSaving)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(loading => {
        this.isSaving = loading
      });

    this.actions$
      .pipe(
        takeUntil(this._unsubscribeAll),
        ofType(ItemApiActions.updateItemSuccess))
      .subscribe((data) => {
        this.matDialogRef.close(data);
      });
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  createUserForm(): FormGroup {
    return this._formBuilder.group({
      userID: [this.selected?.userID],
      email: [this.selected?.email],
      firstName: [this.selected?.firstName],
      lastName: [this.selected?.lastName],
      businessID: [this.selected?.businessID],
    });
  }
  createBusinessForm(): FormGroup {
    return this._formBuilder.group({
      businessID: [],
      userID: [this.selected?.userID],
      companyName: [''],
      isShipper: [],
      is3PL: [],
      isFFW: [],
    });
  }
  createBusiness(): void {
    this.isSaving = true;
    this.appService.updateUser(this.businessForm.value)
      .subscribe(
        (data: Item) => {
          // this.warehouseItemManagerService.onItemSelected.next(data);
          this.matDialogRef.close(data);
          this.notifyService.success('Success', `${data.itemNumber} has been created.`, { timeOut: 3500, clickToClose: true });
        },
        error => {
          this.notifyService.error('Error', `${error}`, { clickToClose: true });
          this.isSaving = false;
        }
      );
  }
  create(): void {
    this.isSaving = true;
    this.appService.createBusiness(this.businessForm.value)
      .subscribe(
        (data: Business) => {
          // this.warehouseItemManagerService.onItemSelected.next(data);
          this.matDialogRef.close(data);
          this.notifyService.success('Success', `${data.companyName} has been created.`, { timeOut: 3500, clickToClose: true });
        },
        error => {
          this.notifyService.error('Error', `${error}`, { clickToClose: true });
          this.isSaving = false;
        }
      );
  }
  edit(): void {
    this.store.dispatch(ItemPageActions.updateItem({ item: this.userForm.value }));
  }

}
