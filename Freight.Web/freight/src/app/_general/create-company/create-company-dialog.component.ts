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
import { ItemApiActions, ItemPageActions } from '../../item/state/actions';
import { ItemEffects } from '../../item/state/item.effect';
import { Actions, ofType } from '@ngrx/effects';
import { AppService } from 'app/app.service';

@Component({
  selector: 'create-company-dialog',
  templateUrl: './create-company-dialog.component.html',
  styleUrls: ['./create-company-dialog.component.scss'],
})
export class CreateCompanyDialogComponent implements OnInit, OnDestroy {
  //imageURL = environment.imageURL;
  showExtraToFields: boolean;
  form: FormGroup;
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
    this.form = this.createForm();
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

  createForm(): FormGroup {
    return this._formBuilder.group({
      companyID: [Number(this.selected?.companyID)],
      companyName: [this.selected?.companyName],
    });
  }
  save(): void {
    if (this.selected.itemID) {
      this.edit();
    } else {
      this.create();
    }
  }

  create(): void {
    this.isSaving = true;
    this.warehouseItemManagerService.createItem(this.form.value)
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
  edit(): void {
    this.store.dispatch(ItemPageActions.updateItem({ item: this.form.value }));
  }

}
