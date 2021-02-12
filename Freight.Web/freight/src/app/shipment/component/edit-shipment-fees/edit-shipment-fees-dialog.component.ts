import { Component, Inject, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { WarehouseItemManagerService } from '../../warehouse-item-manager.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from 'environments/environment';
import { NotificationsService } from 'angular2-notifications';
//import { Item } from 'app/_shared/model/item';
import { Store } from '@ngrx/store';
import * as fromShipment from '../../state';
import { ShipmentApiActions, ShipmentPageActions } from '../../state/actions';
import { ShipmentEffects } from '../../state/shipment.effect';
import { Actions, ofType } from '@ngrx/effects';
import { Shipment, ShipmentFee } from '../../../_shared/model/shipment';
import { ShipmentService } from '../../shipment.service';
import { AppService } from 'app/app.service';
import { Router } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaObserver } from '@angular/flex-layout';
import { fuseAnimations } from '@fuse/animations';
import { Fee } from 'app/_shared/model/fee';
import * as fromApp from 'app/_state';
@Component({
  selector: 'edit-shipment-fees-dialog',
  templateUrl: './edit-shipment-fees-dialog.component.html',
  styleUrls: ['./edit-shipment-fees-dialog.component.scss'],
  animations: fuseAnimations
})
export class EditShipmentFeesDialogComponent implements OnInit, OnDestroy {
  //imageURL = environment.imageURL;
  shipmentFeeForm: FormGroup;
  selectedShipment: Shipment;
  selectedShipmentFee: ShipmentFee;
  fees: Fee[];
  isSaving: boolean;
  isLoading: boolean;
  composeForm: any;
  private _unsubscribeAll: Subject<any>;
  objectKeys = Object.keys;
  constructor(
    private store: Store<fromShipment.State>,
    private _formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<EditShipmentFeesDialogComponent>,
    public appService: AppService,
    private shipmentService: ShipmentService,
    private notifyService: NotificationsService,
    private shipmentEffects: ShipmentEffects,
    private readonly actions$: Actions,
    private router: Router,
    private dom: DomSanitizer,
    public media: MediaObserver,
    private appStore: Store<fromApp.State>,
    @Inject(MAT_DIALOG_DATA) private inputData: any,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.selectedShipmentFee = this.inputData;
    this.shipmentFeeForm = this.createShipmentFeeForm();
    this.appStore.select(fromApp.getCurrentBusinessEntityId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(businessID => {
        this.store.dispatch(ShipmentPageActions.loadFeeList({ businessID }));
      });

    this.store.select(fromShipment.getFeeList)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((fees: Fee[]) => {
        this.fees = fees
      });
    this.store.select(fromShipment.getIsLoading)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(loading => {
        this.isLoading = loading
      });
    this.store.select(fromShipment.getIsSaving)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(loading => {
        this.isSaving = loading
      });

    this.actions$
      .pipe(
        takeUntil(this._unsubscribeAll),
        ofType(ShipmentApiActions.updateShipmentSuccess))
      .subscribe((data) => {
        this.matDialogRef.close(data);
      });

    if (this.router.url.includes('all')) {
    }
    if (this.router.url.includes('open')) {
    }
    if (this.router.url.includes('closed')) {
    }
    if (this.router.url.includes('cancelled')) {
    }

  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  createShipmentFeeForm(): FormGroup {
    return this._formBuilder.group({
      shipmentFeeID: [Number(this.selectedShipmentFee.shipmentFeeID)],
      shipmentID: [Number(this.selectedShipmentFee.shipmentID || 1)],
      feeID: [Number(this.selectedShipmentFee.feeID) || 0],
      feeAmount: [this.selectedShipmentFee.feeAmount],
      fee: [this.fees?.find(i => i.feeID == this.selectedShipmentFee.feeID)]
    });
  }
  updateForm(): void {
    const line = this.shipmentFeeForm.controls['fee'].value;
    this.shipmentFeeForm.controls.feeID.setValue(line.feeID);
    this.shipmentFeeForm.controls.feeType.setValue(line.feeType);
    this.shipmentFeeForm.controls.description.setValue(line.description);
    this.shipmentFeeForm.controls.feeAmount.setValue(line.feeAmount);
  }
  onSave(): void {
    if (this.selectedShipmentFee.shipmentFeeID) {
      this.edit();
    } else {
      this.save();
    }
  }

  save(): void {
    this.matDialogRef.close(this.shipmentFeeForm.value);
  }
  edit(): void {
    this.store.dispatch(ShipmentPageActions.updateShipment({ shipment: this.shipmentFeeForm.value }));
  }

  onFileSelected(event, type) {

    this[type] = event.target.files[0];
    if (!this[type]) {
      return;
    }

    // save the selectedFile 
    const reader = new FileReader();
    reader.onload = (e) => {
      this[type + '64'] = this.dom.bypassSecurityTrustResourceUrl(e.target.result.toString());
      this[type + '64Original'] = e.target.result;

      //this.selectedFile64 = e.target.result;
      //this.refreshPhotoDataSource(this.selectedFile64, this.selectedFile.name);
      // const image = new Image();
      // image.src = this[type + '64'];
    };
    reader.readAsDataURL(this[type]);

    // setTimeout(()=> {
    //     const output: any = document.getElementById(this.selectedFile.name);
    //     console.log(output);
    //     output.src = URL.createObjectURL(event.target.files[0]);
    // }, 100);

    //this.selectedFile = null;
    this[type] = null;
    // const formData: FormData = new FormData();
    // formData.append('uploadedFiles', this.selectedFile, this.selectedFile.name);
    // this.warehouseOutboundService.uploadMarkShipImage(formData)
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe(
    //         (filepath)=> {
    //             this.refreshPhotoDataSource(filepath);
    //             this.isImageLoading = false;
    //             // this.fileInput.nativeElement.value = '';
    //             this.onSelectPhoto(this.dataSourcePhotos.data[0]);

    //             // save the selectedFile 
    //             const reader = new FileReader();
    //             reader.onload = (e) => {
    //                 this.selectedFile64 = e.target.result;
    //                 const image = new Image();
    //                 image.src = this.selectedFile64;
    //                 image.onload = () => {
    //                     this.selectedFile64Width = image.width;
    //                     this.selectedFile64Height = image.height;
    //                 };
    //             };
    //             const file = this.selectedFile;
    //             reader.readAsDataURL(file);
    //             this.selectedFile = null;
    //         },
    //         (err) => {
    //             this.notifyService.error('Error', `${err}`, { clickToClose: true });
    //             this.isImageLoading = false;
    //             this.selectedFile = null;
    //             // this.fileInput.nativeElement.value = '';
    //         }
    //     );
  }
  onRemovePdf(type) {
    const confirmation = confirm(`Are you sure you want to remove this file?`);
    if (!confirmation) {
      return;
    }
    this[type] = null;
  }
  viewPDF(type) {
    let win = window.open();
    win.document.write('<iframe src="data:application/pdf;' + this[type] + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');

  }
  downloadPDF(type) {
    const linkSource = 'data:application/pdf;' + this[type];
    window.open(linkSource);
    const downloadLink = document.createElement("a");
    downloadLink.setAttribute('target', '_blank');
    const fileName = "sample.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

}
