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
import { Shipment } from '../../../_shared/model/shipment';
import { ShipmentService } from '../../shipment.service';
import { AppService } from 'app/app.service';
import { Router } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaObserver } from '@angular/flex-layout';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'edit-shipment-dialog',
  templateUrl: './edit-shipment-dialog.component.html',
  styleUrls: ['./edit-shipment-dialog.component.scss'],
  animations: fuseAnimations
})
export class EditShipmentDialogComponent implements OnInit, OnDestroy {
  //imageURL = environment.imageURL;
  showExtraToFields: boolean;
  shipmentForm: FormGroup;
  selectedShipment: Shipment;
  isSaving: boolean;
  elected: any;
  fileDetailManifest: any;
  fileDetailManifest64: any;
  fileDetailManifest64Original: any;
  fileBLDocument: any;
  fileBLDocument64: any;
  fileBLDocument64Original: any;
  filePackingList: any;
  filePackingList64: any;
  filePackingList64Original: any;
  selectedTabIndex: any;
  isLoading: boolean;
  composeForm: any;
  contacts: any[];
  chat: any;
  selectedContact: any;
  sidebarFolded: boolean;
  user: any;
  private _unsubscribeAll: Subject<any>;
  objectKeys = Object.keys;
  @ViewChild('tabGroup', { static: false }) tabGroup: MatTabGroup;

  constructor(
    private store: Store<fromShipment.State>,
    private _formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<EditShipmentDialogComponent>,
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
    this.selectedShipment = this.inputData;
    this.shipmentForm = this.createShipmentForm();
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

  createShipmentForm(): FormGroup {
    return this._formBuilder.group({
      shipmentID: [Number(this.selectedShipment.shipmentID) || 0],
      businessID: [Number(this.selectedShipment.businessID || 1)],
      shipperID: [Number(this.selectedShipment.shipperID || 2)],
      customerID: [Number(this.selectedShipment.customerID)],
      customer: [''],
      originFFW: [Number(this.selectedShipment.originFFW) || 0],
      origin3PL: [Number(this.selectedShipment.origin3PL) || 0],
      destinationFFW: [Number(this.selectedShipment.destinationFFW) || 0],
      destination3PL: [Number(this.selectedShipment.destination3PL) || 0],
      hblNumber: [this.selectedShipment.hblNumber],
      mblNumber: [this.selectedShipment.mblNumber],
      containerNumber: [this.selectedShipment.containerNumber],
      etd: [this.selectedShipment.etd],
      eta: [this.selectedShipment.eta],
      txl: [this.selectedShipment.txl],
      isfFiled: [this.selectedShipment.isfFiled],
      deliveryLocationID: [this.selectedShipment.deliveryLocationID],
      status: [this.selectedShipment.status],
      memo: [this.selectedShipment.memo],
      shipperReference: [this.selectedShipment.shipperReference],
      updatedBy: [this.selectedShipment.updatedBy],
      updatedOn: [this.selectedShipment.updatedOn],
      createdBy: [this.selectedShipment.createdBy],
      createdOn: [this.selectedShipment.createdOn],
      Date: ['' ],
      Date2: ['' ],
      Date3: ['' ],
    });
  }
  save(): void {
    if (this.selectedShipment.shipmentID) {
      this.edit();
    } else {
      this.create();
    }
  }

  create(): void {
    this.isSaving = true;
    this.shipmentService.createShipment(this.shipmentForm.value)
      .subscribe(
        (data: Shipment) => {
          this.matDialogRef.close(data);
          this.notifyService.success('Success', `${data.shipmentID} has been created.`, { timeOut: 3500, clickToClose: true });
        },
        error => {
          this.notifyService.error('Error', `${error}`, { clickToClose: true });
          this.isSaving = false;
        }
      );
  }
  edit(): void {
    this.store.dispatch(ShipmentPageActions.updateShipment({ shipment: this.shipmentForm.value }));

    // this.warehouseItemManagerService.updateItem(this.shipmentForm.value)
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
    console.log(type);
    console.log(this[type]);

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
