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
import { Shipment, ShipmentPackage } from '../../../_shared/model/shipment';
import { ShipmentService } from '../../shipment.service';
import { AppService } from 'app/app.service';
import { Router } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaObserver } from '@angular/flex-layout';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'edit-shipment-packages-dialog',
  templateUrl: './edit-shipment-packages-dialog.component.html',
  styleUrls: ['./edit-shipment-packages-dialog.component.scss'],
  animations: fuseAnimations
})
export class EditShipmentPackagesDialogComponent implements OnInit, OnDestroy {
  //imageURL = environment.imageURL;
  showExtraToFields: boolean;
  shipmentPackageForm: FormGroup;
  selectedShipment: Shipment;
  selectedShipmentPackage: ShipmentPackage;
  
  selectedTabIndex: any;
  isSaving: boolean;  
  isLoading: boolean;
  composeForm: any;
  private _unsubscribeAll: Subject<any>;
  objectKeys = Object.keys;
  @ViewChild('tabGroup', { static: false }) tabGroup: MatTabGroup;

  constructor(
    private store: Store<fromShipment.State>,
    private _formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<EditShipmentPackagesDialogComponent>,
    public appService: AppService,
    private shipmentService: ShipmentService,
    private notifyService: NotificationsService,
    private shipmentEffects: ShipmentEffects,
    private readonly actions$: Actions,
    private router: Router,
    private dom: DomSanitizer,
    public media: MediaObserver,
    @Inject(MAT_DIALOG_DATA) private inputData: any,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.selectedShipmentPackage = this.inputData;
    this.shipmentPackageForm = this.createshipmentPackageForm();
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

  createshipmentPackageForm(): FormGroup {
    return this._formBuilder.group({
      shipmentPackageID: [Number(this.selectedShipmentPackage.shipmentID) || 0],
      businessID: [Number(this.selectedShipmentPackage.businessID || 1)],
      shipmentID: [Number(this.selectedShipmentPackage.businessID || 1)],
      status: [this.selectedShipmentPackage.status],
      packageNumber: [this.selectedShipmentPackage.packageNumber],
      dimension: [this.selectedShipmentPackage.dimension],
      weight: [Number(this.selectedShipmentPackage.weight)],
      weightUnit: [this.selectedShipmentPackage.weightUnit],
      shipmentPackageRateID: [this.selectedShipmentPackage.shipmentPackageRateID],
      shippingCarrierID: [this.selectedShipmentPackage.shippingCarrierID],
      shippingServiceID: [this.selectedShipmentPackage.shippingServiceID],
      shippingPackageID: [this.selectedShipmentPackage.shippingPackageID],
      shippingRate: [Number(this.selectedShipmentPackage.shippingRate)],
      trackingNumber: [this.selectedShipmentPackage.trackingNumber],
      uspspicNumber: [this.selectedShipmentPackage.uspspicNumber],
      shippingLabelPath: [this.selectedShipmentPackage.shippingLabelPath],
      shipDate: [this.selectedShipmentPackage.shipDate],
      isRated: [this.selectedShipmentPackage.isRated],
      isLabeled: [this.selectedShipmentPackage.isLabeled],
      isManual: [this.selectedShipmentPackage.isManual]
    });
  }
  save(): void {
    if (this.selectedShipment?.shipmentID) {
      this.edit();
    } else {
      this.create();
    }
  }

  create(): void {
    this.matDialogRef.close(this.shipmentPackageForm.value);
  }
  edit(): void {
    this.store.dispatch(ShipmentPageActions.updateShipment({ shipment: this.shipmentPackageForm.value }));

    // this.warehouseItemManagerService.updateItem(this.shipmentPackageForm.value)
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

  onSelectedTabChange() {
    //
  }
  onDialogClose() {
    //
  }
  onHandlePrev() {
    if (this.tabGroup.selectedIndex === 0) {
      this.selectedTabIndex = 2;
    }
    else {
      this.selectedTabIndex = this.tabGroup.selectedIndex - 1;
    }
  }
  onHandleNext() {
    if (this.tabGroup.selectedIndex === 2) {
      this.selectedTabIndex = 0;
    }
    else {
      this.selectedTabIndex = this.tabGroup.selectedIndex + 1;
    }
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
