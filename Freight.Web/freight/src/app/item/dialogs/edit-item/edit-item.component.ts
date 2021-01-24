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

@Component({
  selector: 'edit-item-dialog',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss'],
})
export class EditItemDialogComponent implements OnInit, OnDestroy {
  //imageURL = environment.imageURL;
  showExtraToFields: boolean;
  itemForm: FormGroup;
  selectedItem: any;
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
    this.warehouseItemManagerService.onItemSelected
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(selectedItem => {
        this.selectedItem = selectedItem;
        this.itemForm = this.createItemForm();
      });
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  createItemForm(): FormGroup {
    return this._formBuilder.group({
      ItemNumber: [this.selectedItem.ItemNumber],
      ItemName: [this.selectedItem.ItemName],
      HTSCode: [this.selectedItem.FNSKU],
      ASIN: [this.selectedItem.ASIN],
      Weight: [this.selectedItem.Weight],
      WeightUnit: [this.selectedItem.WeightUnit],
      UnitPrice: [this.selectedItem.UnitPrice],
      Currency: [this.selectedItem.Currency],
      UpdatedOn: [this.selectedItem.UpdatedOn],
      CreatedOn: [this.selectedItem.CreatedOn],
    });
  }

  toggleExtraToFields(): void {
    this.showExtraToFields = !this.showExtraToFields;
  }

  save(): void {
    this.isSaving = true;
    this.warehouseItemManagerService.editItemDimension(this.itemForm.value)
      .subscribe(
        data => {
          this.selectedItem.Data = data;
          this.warehouseItemManagerService.onItemSelected.next(this.selectedItem);
          this.matDialogRef.close(this.selectedItem);
        },
        error => {
          this.notifyService.error('Error', `${error}`, { clickToClose: true });
          this.isSaving = false;
        }
      );
  }
}
