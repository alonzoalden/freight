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

  objectKeys = Object.keys;

  constructor(
    private _formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<EditItemDialogComponent>,
    private warehouseItemManagerService: ItemService,
    public warehouseService: ItemService,
    private notifyService: NotificationsService,
    @Inject(MAT_DIALOG_DATA) private inputData: any,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.selectedItem = this.inputData;
    this.itemForm = this.createItemForm();
    // this.warehouseItemManagerService.onItemSelected
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe(selectedItem => {
    //     this.selectedItem = selectedItem;
    //     this.itemForm = this.createItemForm();
    //   });
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  createItemForm(): FormGroup {
    return this._formBuilder.group({
      ItemID: [this.selectedItem.itemID],
      ItemNumber: [this.selectedItem.itemNumber],
      ItemName: [this.selectedItem.itemName],
      HTSCode: [this.selectedItem.htsCode],
      FNSKU: [this.selectedItem.fnsku],
      ASIN: [this.selectedItem.asin],
      Weight: [this.selectedItem.weight],
      WeightUnit: [this.selectedItem.weightUnit],
      UnitPrice: [this.selectedItem.unitPrice],
      Currency: [this.selectedItem.currency],
      UpdatedOn: [this.selectedItem.updatedOn],
      CreatedOn: [this.selectedItem.createdOn],
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
    this.isSaving = true;
    this.warehouseItemManagerService.createItem(this.itemForm.value)
      .subscribe(
        (data: Item) => {
          this.warehouseItemManagerService.onItemSelected.next(data);
          this.matDialogRef.close(this.selectedItem);
          this.notifyService.success('Success', `${data.itemNumber} has been created.`, { timeOut:'4000', clickToClose: true });
        },
        error => {
          this.notifyService.error('Error', `${error}`, { clickToClose: true });
          this.isSaving = false;
        }
      );
  }
  edit(): void {
    this.isSaving = true;
    this.warehouseItemManagerService.updateItem(this.itemForm.value)
      .subscribe(
        (data: Item) => {
          this.warehouseItemManagerService.onItemSelected.next(data);
          this.matDialogRef.close(this.selectedItem);
          this.notifyService.success('Success', `${data.itemNumber} has been updated.`, { timeOut:'4000', clickToClose: true });
        },
        error => {
          this.notifyService.error('Error', `${error}`, { clickToClose: true });
          this.isSaving = false;
        }
      );
  }
  
}
