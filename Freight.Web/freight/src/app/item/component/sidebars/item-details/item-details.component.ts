import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ItemService } from '../../../item.service';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationsService } from 'angular2-notifications';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { environment } from 'environments/environment';
import { AppService } from 'app/app.service';
import { EditItemDialogComponent } from 'app/item/component/edit-item/edit-item-dialog.component';

@Component({
  selector: 'item-details-sidebar',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
  animations: fuseAnimations
})
export class ItemDetailsSidebarComponent implements OnInit, OnDestroy {
  selected: any;
  isEdit: boolean;
  isLeadRole: boolean;
  dataSource1: any;
  dialogRef: any;
  displayedColumns1 = ['PONumber', 'ContainerNumber', 'InboundShipmentNumber', 'CartonNumber', 'Quantity'];
  private _unsubscribeAll: Subject<any>;
  constructor(
    public appService: AppService,
    public itemManagerService: ItemService,
    public warehouseService: ItemService,
    private router: Router,
    public _matDialog: MatDialog,
    private _fuseSidebarService: FuseSidebarService,
    private notifyService: NotificationsService,
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.itemManagerService.onItemSelected
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(selected => {
        this.selected = selected;
        if (this.selected.Data) {
          this.dataSource1 = new MatTableDataSource<any>(this.selected.Data.ItemCartonInformations);
        }
      });
  }
  openEditItemDialog(): void {
    this.dialogRef = this._matDialog.open(EditItemDialogComponent, {
      panelClass: 'edit-fields-dialog'
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (!response) {
          return;
        }
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  closeSidebar(): void {
    this._fuseSidebarService.getSidebar('file-manager-details-sidebar').toggleOpen();
  }
}
