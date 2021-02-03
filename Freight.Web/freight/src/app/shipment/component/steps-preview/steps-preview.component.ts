import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
//import { WarehouseItemManagerService } from '../warehouse-item-manager.service';
//import { ItemList, Item } from 'app/shared/class/item';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
//import { MailComposeDialogComponent } from '../dialogs/edit-dimensions/edit-dimensions.component';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { CartonInformationDialogComponent } from '../dialogs/carton-information/carton-information.component';
// import { InventoryDetailDialogComponent } from '../dialogs/inventory-detail/inventory-detail.component';
// import { PotentialLocationDialogComponent } from '../dialogs/potential-location/potential-location.component';
// import { PrintLabelDialogComponent } from '../dialogs/print-label/print-label.component';
//import { Member } from 'app/shared/class/member';
import { AppService } from 'app/app.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ShipmentService } from '../../shipment.service';

@Component({
    selector: 'steps-preview',
    templateUrl: './steps-preview.component.html',
    styleUrls: ['./steps-preview.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('detailExpand', [
        state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
            state('expanded', style({ height: '*', visibility: 'visible' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
        fuseAnimations,
    ],
})
export class StepsPreviewComponent implements OnInit, OnDestroy {
    constructor(
        public appService: AppService,
        public _matDialog: MatDialog,
    ) {
        
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }
}
