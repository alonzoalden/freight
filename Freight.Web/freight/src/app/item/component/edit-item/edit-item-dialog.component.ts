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
import * as fromItem from '../../state';
import { ItemApiActions, ItemPageActions } from '../../state/actions';
import { ItemEffects } from '../../state/item.effect';
import { Actions, ofType } from '@ngrx/effects';
import { AppService } from 'app/app.service';
import * as fromApp from 'app/_state';

@Component({
  selector: 'edit-item-dialog',
  templateUrl: './edit-item-dialog.component.html',
  styleUrls: ['./edit-item-dialog.component.scss'],
})
export class EditItemDialogComponent implements OnInit, OnDestroy {
  //imageURL = environment.imageURL;
  showExtraToFields: boolean;
  itemForm: FormGroup;
  selectedItem: Item;
  private _unsubscribeAll: Subject<any>;
  isSaving: boolean;
  businessID: any;

  objectKeys = Object.keys;

  constructor(
    private store: Store<fromItem.State>,
    private appStore: Store<fromApp.State>,
    private _formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<EditItemDialogComponent>,
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
    this.selectedItem = this.inputData;
    

    this.appStore.select(fromApp.getCurrentBusinessEntityId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(businessid => {
        this.businessID = businessid;
        this.itemForm = this.createItemForm();
      });

    this.store.select(fromItem.getIsSaving)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(loading => {
        this.isSaving = loading
      });

    this.actions$
      .pipe(
        takeUntil(this._unsubscribeAll),
        ofType(ItemApiActions.updateItemSuccess, ItemApiActions.createItemSuccess))
      .subscribe((data) => {
        this.matDialogRef.close(data);
      });
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  createItemForm(): FormGroup {
    return this._formBuilder.group({
      itemID: [this.selectedItem.itemID],
      businessID: [this.businessID],
      shipperID: [null],
      itemNumber: [this.selectedItem.itemNumber],
      itemName: [this.selectedItem.itemName],
      htsCode: [this.selectedItem.htsCode],
      fnsku: [this.selectedItem.fnsku],
      asin: [this.selectedItem.asin],
      weight: [Number(this.selectedItem.weight || 0)],
      weightUnit: [this.selectedItem.weightUnit],
      unitPrice: [Number(this.selectedItem.unitPrice || 0)],
      currency: [this.selectedItem.currency],
      updatedOn: [this.selectedItem.updatedOn],
      createdOn: [this.selectedItem.createdOn],
    });
  }
  save(): void {
    if (this.selectedItem.itemID) {
      this.edit();
    } else {
      this.create();
    }
  }

  create(): void {
    this.store.dispatch(ItemPageActions.createItem({ item: this.itemForm.value }));
  }
  edit(): void {
    this.store.dispatch(ItemPageActions.updateItem({ item: this.itemForm.value }));

    // this.warehouseItemManagerService.updateItem(this.itemForm.value)
    //   .subscribe(
    //     (data: Item) => {
    //       // this.warehouseItemManagerService.onItemSelected.next(data);
    //       this.matDialogRef.close(data);
    //       this.notifyService.success('Success', `${data.itemNumber} has been updated.`, { timeOut:3500, clickToClose: true });
    //     },
    //     error => {
    //       this.notifyService.error('Error', `${error}`, { clickToClose: true });
    //       this.isSaving = false;
    //     }
    //   );
  }

}
