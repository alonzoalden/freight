import { Component, Inject, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
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
import { Shipment, ShipmentContact, ShipmentDetail, ShipmentFee, ShipmentLine, ShipmentPackage } from '../../../_shared/model/shipment';
import { ShipmentService } from '../../shipment.service';
import { AppService } from 'app/app.service';
import { NavigationStart, Router } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaObserver } from '@angular/flex-layout';
import { fuseAnimations } from '@fuse/animations';
import { EditShipmentPackagesDialogComponent } from '../edit-shipment-packages/edit-shipment-packages-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'app/_shared/confirmation-dialog/confirmation-dialog.component';
import { EditShipmentLinesDialogComponent } from '../edit-shipment-lines/edit-shipment-lines-dialog.component';
import { EditShipmentFeesDialogComponent } from '../edit-shipment-fees/edit-shipment-fees-dialog.component';
import { EditShipmentContactsDialogComponent } from '../edit-shipment-contacts/edit-shipment-contacts-dialog.component';
import * as fromApp from 'app/_state';
import { User } from 'app/_shared/model/user';
@Component({
  selector: 'edit-shipment-dialog',
  templateUrl: './edit-shipment-dialog.component.html',
  styleUrls: ['./edit-shipment-dialog.component.scss'],
  animations: fuseAnimations
})
export class EditShipmentDialogComponent implements OnInit, OnDestroy {
  //imageURL = environment.imageURL;
  dataSourceLines: any;
  dataSourcePackages: any;
  dataSourceFees: any;
  dataSourceContacts: any;
  displayedLinesColumns = ['index', 'itemItemName', 'itemItemNumber', 'unitPrice', 'quantity', 'actions'];
  displayedPackageColumns = ['index', 'shippingCarrierID', 'dimension', 'weight', 'shippingServiceID', 'trackingNumber', 'status', 'actions'];
  displayedFeeColumns = ['index', 'feeFeeType', 'feeAmount', 'actions'];
  displayedContactsColumns = ['index', 'contactFullName', 'contactEmail', 'actions'];

  userInfo: User;
  shipmentForm: FormGroup;
  selectedShipment: Shipment;
  selectedShipmentDetail: ShipmentDetail;
  selectedShipmentPackageRow: ShipmentPackage;
  selectedShipmentLineRow: ShipmentLine;
  selectedShipmentFeeRow: ShipmentFee;
  selectedShipmentContactRow: ShipmentContact;
  isSaving: boolean;
  selected: any;
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
  dialogRef: any;
  businessID: any;
  threePLList: any;
  ffwList: any;
  shippersList: any;
  customersList: any;
  commentsList: any;
  locationsList: any;
  chatComment: any;
  close: boolean = false;

  private _unsubscribeAll: Subject<any>;
  objectKeys = Object.keys;
  @ViewChild('tabGroup', { static: false }) tabGroup: MatTabGroup;

  constructor(
    private appStore: Store<fromApp.State>,
    private store: Store<fromShipment.State>,
    private _formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<EditShipmentDialogComponent>,
    public appService: AppService,
    private shipmentService: ShipmentService,
    private notifyService: NotificationsService,
    private readonly actions$: Actions,
    private dom: DomSanitizer,
    public media: MediaObserver,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private inputData: any,
  ) {
    this._unsubscribeAll = new Subject();
    //this.shipmentForm = this.createShipmentForm();
  }

  ngOnInit(): void {
    //this.selectedShipment = this.inputData.data;
    // this.dataSourceLines = new MatTableDataSource<any>(this.selectedShipmentDetail?.shipmentLines || []);
    // this.dataSourcePackages = new MatTableDataSource<any>(this.selectedShipmentDetail?.shipmentPackages || []);
    // this.dataSourceFees = new MatTableDataSource<any>(this.selectedShipmentDetail?.shipmentFees || []);
    // this.dataSourceContacts = new MatTableDataSource<any>(this.selectedShipmentDetail?.shipmentContacts || []);

    this.appStore.select(fromApp.getCurrentBusinessEntityId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(businessid => {
        this.businessID = businessid;
        this.store.dispatch(ShipmentPageActions.getCustomers({ businessID: businessid }));

        this.appStore.select(fromApp.getCurrentUser)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(user => {
            this.userInfo = user;
            //this.shipmentForm = this.createShipmentForm();
          });
      });

    this.store.select(fromShipment.getIsSaving)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(loading => {
        this.isSaving = loading
      });

    this.store.select(fromShipment.getSelectedShipment)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.selectedShipment = data;

        if (!this.shipmentForm) {

          this.shipmentForm = this.createShipmentForm();
        }


        if (!this.dataSourceLines?.data) {
          this.store.dispatch(ShipmentPageActions.loadShipmentLineList({shipmentID: this.selectedShipment.shipmentID}));
          this.store.dispatch(ShipmentPageActions.loadShipmentPackageList({shipmentID: this.selectedShipment.shipmentID}));
          this.store.dispatch(ShipmentPageActions.loadShipmentContactList({shipmentID: this.selectedShipment.shipmentID}));
          this.store.dispatch(ShipmentPageActions.loadShipmentFeeList({shipmentID: this.selectedShipment.shipmentID}));
          this.store.dispatch(ShipmentPageActions.loadShipmentCommentList({shipmentID: this.selectedShipment.shipmentID}));
        }

      });
    this.store.select(fromShipment.getSelectedShipmentPackageRow)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(row => {
        this.selectedShipmentPackageRow = row;
      });

    this.store.select(fromShipment.getSelectedShipmentLineRow)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(row => {
        this.selectedShipmentLineRow = row;
      });

    this.store.select(fromShipment.getSelectedShipmentFeeRow)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(row => {
        this.selectedShipmentFeeRow = row;
      });

    this.store.select(fromShipment.getSelectedShipmentContactRow)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(row => {
        this.selectedShipmentContactRow = row;
      });


    this.store.select(fromShipment.get3plList)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.threePLList = data;
      });
    this.store.select(fromShipment.getFFWList)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.ffwList = data;
      });
    this.store.select(fromShipment.getCustomers)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.customersList = data;
      });
    this.store.select(fromShipment.getShippersList)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.shippersList = data;
      });
    this.store.select(fromShipment.getLocationList)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.locationsList = data;
      });
    
    this.actions$
      .pipe(
        takeUntil(this._unsubscribeAll),
        ofType(ShipmentApiActions.updateShipmentSuccess))
      .subscribe((data) => {
        if (this.close) {
          this.matDialogRef.close(data);
        }
      });

    this.actions$
      .pipe(
        takeUntil(this._unsubscribeAll),
        ofType(ShipmentApiActions.createShipmentCommentSuccess))
      .subscribe((data) => {
        this.chatComment = null;
      });

    this.store.select(fromShipment.getShipmentLineList)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.dataSourceLines = new MatTableDataSource<any>(data || []);
      });
    this.store.select(fromShipment.getShipmentPackageList)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.dataSourcePackages = new MatTableDataSource<any>(data || []);
      });
    this.store.select(fromShipment.getShipmentFeeList)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.dataSourceFees = new MatTableDataSource<any>(data || []);
      });
    this.store.select(fromShipment.getShipmentContactList)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.dataSourceContacts = new MatTableDataSource<any>(data || []);
      });
    this.store.select(fromShipment.getShipmentCommentList)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        if (data?.length) {
          const updatedListToLocale = data.map(comment => {
            const utcDate = new Date(comment.createdOn);
            return {
              ...comment,
              localDate: new Date(utcDate + ' UTC')
            }
          });
          this.commentsList = updatedListToLocale;
        }
      });

  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.commentsList = null;
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  createShipmentForm(): FormGroup {
    return this._formBuilder.group({
      shipmentID: [this.selectedShipment?.shipmentID],
      businessID: [this.businessID],
      shipperID: [{value:this.selectedShipment?.shipperID, disabled: true}],
      customerID: [this.selectedShipment?.customerID],
      customer: [''],
      originFFW: [this.selectedShipment?.originFFW],
      origin3PL: [this.selectedShipment?.origin3PL],
      destinationFFW: [this.selectedShipment?.destinationFFW],
      destination3PL: [this.selectedShipment?.destination3PL],
      hblNumber: [this.selectedShipment?.hblNumber],
      mblNumber: [this.selectedShipment?.mblNumber],
      containerNumber: [this.selectedShipment?.containerNumber],
      etd: [this.selectedShipment?.etd],
      eta: [this.selectedShipment?.eta],
      txl: [this.selectedShipment?.txl],
      isfFiled: [this.selectedShipment?.isfFiled],
      deliveryLocationID: [this.selectedShipment?.deliveryLocationID],
      status: [this.selectedShipment?.status],
      memo: [this.selectedShipment?.memo],
      shipperReference: [this.selectedShipment?.shipperReference],
      updatedBy: [this.selectedShipment?.updatedBy],
      updatedOn: [this.selectedShipment?.updatedOn],
      createdBy: [this.userInfo?.userID],
      Date: [''],
      Date2: [''],
      Date3: [''],
      // shipmentLines: [this.selectedShipment?.shipmentLines],
      // shipmentPackages: [this.selectedShipment?.shipmentPackages],
      // shipmentFees: [this.selectedShipment?.shipmentFees],
      // shipmentContacts: [this.selectedShipment?.shipmentContacts],
    });
  }
  save(close): void {
    if (this.selectedShipment?.shipmentID) {
      this.edit(close);
    } else {
      this.create(close);
    }
  }

  create(close): void {
    //const dataToSend = new ShipmentDetail({ ...this.shipmentForm.value }, this.dataSourceLines.data, this.dataSourcePackages.data, this.dataSourceFees.data, this.dataSourceContacts.data);
    this.isSaving = true;
    this.shipmentService.createShipment(this.shipmentForm.value)
      .subscribe(
        (data: Shipment) => {
          if (close) {
            this.notifyService.success('Success', `${data.shipmentID} has been created.`, { timeOut: 2000, clickToClose: true });
            this.matDialogRef.close(data);
          }
          // this.notifyService.success('Success', `${data.shipmentID} has been created.`, { timeOut: 2000, clickToClose: true });
        },
        error => {
          this.notifyService.error('Error', `${error}`, { clickToClose: true });
          this.isSaving = false;
        }
      );
  }
  edit(close): void {
    if (close) {
      this.close = true;
    }
    const data = {...this.shipmentForm.value};
    data.shipperID = this.selectedShipment?.shipperID;
    this.store.dispatch(ShipmentPageActions.updateShipment({ shipment: data }));
  }

  onSelectPackage(currentShipmentPackageRow: ShipmentPackage): void {
    this.store.dispatch(ShipmentPageActions.setCurrentShipmentPackageRow({ currentShipmentPackageRow }));
  }
  onSelectLine(currentShipmentLineRow: ShipmentLine): void {
    this.store.dispatch(ShipmentPageActions.setCurrentShipmentLineRow({ currentShipmentLineRow }));
  }
  onSelectContact(currentShipmentContactRow: ShipmentContact): void {
    this.store.dispatch(ShipmentPageActions.setCurrentShipmentContactRow({ currentShipmentContactRow }));
  }
  onSelectFee(currentShipmentFeeRow: ShipmentFee): void {
    this.store.dispatch(ShipmentPageActions.setCurrentShipmentFeeRow({ currentShipmentFeeRow }));
  }

  onDeletePackage(row: ShipmentPackage): void {
    this.dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      data: { message: `Are you sure you want to remove this package?` },
    });
    this.dialogRef.afterClosed()
      .subscribe((response) => {
        if (response) {
          if (row.shipmentPackageID) {
            this.store.dispatch(ShipmentPageActions.deleteShipmentPackage({ shipmentPackageID: row.shipmentPackageID }));
          } else {
            this.dataSourcePackages.data = this.dataSourcePackages.data.filter(pkg => pkg !== row);
          }
        }
      });
  }
  onDeleteLine(row: ShipmentLine): void {
    this.dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      data: { message: `Are you sure you want to remove this line?` },
    });
    this.dialogRef.afterClosed()
      .subscribe((response) => {
        if (response) {
          if (row.shipmentLineID) {
            this.store.dispatch(ShipmentPageActions.deleteShipmentLine({ shipmentLineID: row.shipmentLineID }));
          } else {
            this.dataSourceLines.data = this.dataSourceLines.data.filter(pkg => pkg !== row);
          }
        }
      });
  }
  onDeleteFee(row: ShipmentFee): void {
    this.dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      data: { message: `Are you sure you want to remove this fee?` },
    });
    this.dialogRef.afterClosed()
      .subscribe((response) => {
        if (response) {
          if (row.shipmentFeeID) {
            this.store.dispatch(ShipmentPageActions.deleteShipmentFee({ shipmentFeeID: row.shipmentFeeID }));
          } else {
            this.dataSourceFees.data = this.dataSourceFees.data.filter(pkg => pkg !== row);
          }
        }
      });
  }
  onDeleteContact(row: ShipmentContact): void {
    this.dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      data: { message: `Are you sure you want to remove this contact?` },
    });
    this.dialogRef.afterClosed()
      .subscribe((response) => {
        if (response) {
          if (row.shipmentContactID) {
            this.store.dispatch(ShipmentPageActions.deleteShipmentContact({ shipmentContactID: row.shipmentContactID }));
          } else {
            this.dataSourceContacts.data = this.dataSourceContacts.data.filter(pkg => pkg !== row);
          }
        }
      });
  }

  onSelectedTabChange() {
    this.save(null);
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
  openEditShipmentPackageDialog(data, updateType) {
    this.dialogRef = this._matDialog.open(EditShipmentPackagesDialogComponent, {
      panelClass: 'edit-fields-dialog',
      width: '100%',
      disableClose: true,
      data: data
    });
    this.dialogRef.afterClosed()
      .subscribe((data: ShipmentPackage) => {
        if (!data) {
          return;
        }
        // if (updateType == 'edit') {
        //   if (data.shippingPackageID) {
        //     // if editing a saved package
        //     const index = this.dataSourcePackages.data.findIndex(item => item.shippingPackageID == data.shippingPackageID);
        //     this.dataSourcePackages.data.splice(index, 1, data);
        //     this.onSelectPackage(this.dataSourcePackages.data[index]);
        //   }
        //   else if (!data.shippingPackageID) {
        //     // if editing a package that is not saved yet
        //     const index = this.dataSourcePackages.data.findIndex(item => item == this.selectedShipmentPackageRow);
        //     this.dataSourcePackages.data.splice(index, 1, data);
        //     this.onSelectPackage(this.dataSourcePackages.data[index]);
        //   }
        // }
        // else {
        //   // if creating
        //   this.dataSourcePackages.data.unshift(data);
        //   this.onSelectPackage(this.dataSourcePackages.data[0]);
        // }
        // this.dataSourcePackages.data = this.dataSourcePackages.data;

      });
  }
  openEditShipmentLineDialog(data, updateType) {
    this.dialogRef = this._matDialog.open(EditShipmentLinesDialogComponent, {
      panelClass: 'edit-fields-dialog',
      width: '100%',
      disableClose: true,
      data: data
    });
    this.dialogRef.afterClosed()
      .subscribe((data: ShipmentLine) => {
        if (!data) {
          return;
        }
        // if (updateType == 'edit') {
        //   if (data.shipmentLineID) {
        //     // if editing a saved package
        //     const index = this.dataSourceLines.data.findIndex(item => item.shipmentLineID == data.shipmentLineID);
        //     this.dataSourceLines.data.splice(index, 1, data);
        //     this.onSelectPackage(this.dataSourceLines.data[index]);
        //   }
        //   else if (!data.shipmentLineID) {
        //     // if editing a package that is not saved yet
        //     const index = this.dataSourceLines.data.findIndex(item => item == this.selectedShipmentPackageRow);
        //     this.dataSourceLines.data.splice(index, 1, data);
        //     this.onSelectPackage(this.dataSourceLines.data[index]);
        //   }
        // }
        // else {
        //   // if creating
        //   this.dataSourceLines.data.unshift(data);
        //   this.onSelectPackage(this.dataSourceLines.data[0]);
        // }
        // this.dataSourceLines.data = this.dataSourceLines.data;

      });
  }
  openEditShipmentFeeDialog(data, updateType) {
    this.dialogRef = this._matDialog.open(EditShipmentFeesDialogComponent, {
      panelClass: 'edit-fields-dialog',
      width: '100%',
      disableClose: true,
      data: data
    });
    this.dialogRef.afterClosed()
      .subscribe((data: ShipmentFee) => {
        if (!data) {
          return;
        }
        // if (updateType == 'edit') {
        //   if (data.shipmentFeeID) {
        //     // if editing a saved package
        //     const index = this.dataSourceFees.data.findIndex(item => item.shipmentFeeID == data.shipmentFeeID);
        //     this.dataSourceFees.data.splice(index, 1, data);
        //     this.onSelectPackage(this.dataSourceFees.data[index]);
        //   }
        //   else if (!data.shipmentFeeID) {
        //     // if editing a package that is not saved yet
        //     const index = this.dataSourceFees.data.findIndex(item => item == this.selectedShipmentPackageRow);
        //     this.dataSourceFees.data.splice(index, 1, data);
        //     this.onSelectPackage(this.dataSourceFees.data[index]);
        //   }
        // }
        // else {
        //   // if creating
        //   this.dataSourceFees.data.unshift(data);
        //   this.onSelectPackage(this.dataSourceFees.data[0]);
        // }
        // this.dataSourceFees.data = this.dataSourceFees.data;

      });
  }
  openEditShipmentContactDialog(data, updateType) {
    this.dialogRef = this._matDialog.open(EditShipmentContactsDialogComponent, {
      panelClass: 'edit-fields-dialog',
      width: '100%',
      disableClose: true,
      data: data
    });
    this.dialogRef.afterClosed()
      .subscribe((data: ShipmentContact) => {
        if (!data) {
          return;
        }
        // if (updateType == 'edit') {
        //   if (data.shipmentContactID) {
        //     // if editing a saved package
        //     const index = this.dataSourceContacts.data.findIndex(item => item.shipmentContactID == data.shipmentContactID);
        //     this.dataSourceContacts.data.splice(index, 1, data);
        //     this.onSelectPackage(this.dataSourceContacts.data[index]);
        //   }
        //   else if (!data.shipmentContactID) {
        //     // if editing a package that is not saved yet
        //     const index = this.dataSourceContacts.data.findIndex(item => item == this.selectedShipmentPackageRow);
        //     this.dataSourceContacts.data.splice(index, 1, data);
        //     this.onSelectPackage(this.dataSourceContacts.data[index]);
        //   }
        // }
        // else {
        //   // if creating
        //   this.dataSourceContacts.data.unshift(data);
        //   this.onSelectPackage(this.dataSourceContacts.data[0]);
        // }
        // this.dataSourceContacts.data = this.dataSourceContacts.data;
      });
  }
  addMessage() {
    if (!this.chatComment) {
      return;
    }
    const data = {
      comment: this.chatComment,
      shipmentID: this.selectedShipment.shipmentID,
      createdBy: this.userInfo.userID
    }
    
    this.store.dispatch(ShipmentPageActions.createShipmentComment({ shipmentComment: data }));
  }
}
