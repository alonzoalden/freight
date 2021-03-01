import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  EventEmitter,
  Output,
} from "@angular/core";
import { Subject } from "rxjs";
import { fuseAnimations } from "@fuse/animations";
import { FuseSidebarService } from "@fuse/components/sidebar/sidebar.service";
import { ShipmentService } from "../../shipment.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { AppService } from "app/app.service";
import { NotificationsService } from "angular2-notifications";
import { EditShipmentDialogComponent } from "../edit-shipment/edit-shipment-dialog.component";
import { Item } from "app/_shared/model/item";
import * as fromItem from '../../state';
import { Store } from "@ngrx/store";
import { Shipment } from "app/_shared/model/shipment";
import { CreateShipmentDialogComponent } from "../create-shipment-dialog/create-shipment-dialog.component";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
@Component({
  selector: 'shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.scss'],
  animations: [fuseAnimations],
})
export class ShipmentListComponent implements OnInit, OnDestroy {
  @Input() shipments: Shipment[] = [];
  @Input() selected: Shipment;
  @Input() isLoading: boolean;
  @Input() isShipmentListLoading: boolean;
  @Output() select = new EventEmitter<Item>();
  @Output() deleteShipment = new EventEmitter<any>();
  files: any;
  dataSource: any = new MatTableDataSource();
  displayedColumns = ['shipmentID', 'hblNumber', 'mblNumber', 'containerNumber', 'etd', 'eta', 'txl', 'status', 'createdOn', 'actions'];
  isLeadRole: boolean;
  filteredCourses: any[];
  currentCategory: string;
  searchTerm: string;
  searchEnabled: boolean;
  dialogRef: any;
  inputEnabled: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('sort', {static: true}) sort: MatSort;
  @ViewChild('mainInput') mainInput: ElementRef;
  private _unsubscribeAll: Subject<any>;

  constructor(
    public appService: AppService,
    private _fuseSidebarService: FuseSidebarService,
    private shipmentService: ShipmentService,
    public _matDialog: MatDialog,
    private router: Router,
  ) {
    this._unsubscribeAll = new Subject();
    this.searchTerm = "";
    this.searchEnabled = false;
    this.inputEnabled = true;
  }
  ngOnChanges(changes): void {
    if (changes.shipments) {
      
      // load shipments based off route
      if (this.router.url.includes('open')) {
        const shipments = this.shipments.filter(shipment => shipment.status === 'Open');
        this.refreshDataSource(shipments);
      }
      else if (this.router.url.includes('closed')) {
        const shipments = this.shipments.filter(shipment => shipment.status === 'Closed');
        this.refreshDataSource(shipments);
      }
      else if (this.router.url.includes('cancelled')) {
        const shipments = this.shipments.filter(shipment => shipment.status === 'Cancelled');
        this.refreshDataSource(shipments);
      }
      else {
        this.refreshDataSource(this.shipments);
      }

      // load shipments if route change
      this.router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          if (event.url.includes('open')) {
            const shipments = this.shipments.filter(shipment => shipment.status === 'Open');
            this.refreshDataSource(shipments);
          }
          else if (event.url.includes('closed')) {
            const shipments = this.shipments.filter(shipment => shipment.status === 'Closed');
            this.refreshDataSource(shipments);
          }
          else if (event.url.includes('cancelled')) {
            const shipments = this.shipments.filter(shipment => shipment.status === 'Cancelled');
            this.refreshDataSource(shipments);
          }
          else {
            this.refreshDataSource(this.shipments);
          }
        }
      });
      this.focusMainInput();
    }


  }
  refreshDataSource(shipments): void {
    if (!shipments) {
      return;
    }
    this.dataSource = new MatTableDataSource<any>(shipments);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.focusMainInput();

    // this.router.events.forEach((event) => {
    //   if(event instanceof NavigationStart) {
    //     if (event.url.includes('open')) {
    //       console.log(event);
    //     }
    //     if (event.url.includes('open')) {
    //       console.log(event);
    //     }
    //     if (event.url.includes('open')) {
    //       console.log(event);
    //     }
    //   }
    //   // NavigationEnd
    //   // NavigationCancel
    //   // NavigationError
    //   // RoutesRecognized

    //   // if (this.router.url.includes('all')) {
    //   //   console.log('all')
    //   // }
    //   // if (this.router.url.includes('open')) {
    //   //   console.log('open')
    //   // }
    //   // if (this.router.url.includes('closed')) {
    //   //   console.log('closed')
    //   // }
    //   // if (this.router.url.includes('cancelled')) {
    //   //   console.log('cancelled')
    //   // }
    // });

  }

  ngOnDestroy(): void {
    //this.itemService.onItemSelected.next({});
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onSelect(item: Item): void {
    this.select.emit(item);
  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  toggleSearch(): void {
    this.searchEnabled = !this.searchEnabled;
  }
  cancelSearch(): void {
    this.toggleSearch();
    this.searchTerm = "";
    this.filterBySearchTerm();
  }

  filterBySearchTerm(): void {
    const searchTerm = this.searchTerm.toLowerCase();

    // Search
    if (searchTerm === "") {
      this.filteredCourses = this.dataSource.data;
    } else {
      this.filteredCourses = this.dataSource.data.filter((course) => {
        return course.title.toLowerCase().includes(searchTerm);
      });
    }
  }

  applyFilter(filterValue: string) {
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      this.shipmentService.onShipmentSelected.next({});
    }
  }
  openEditShipmentDialog(data = {}) {
    this.dialogRef = this._matDialog.open(EditShipmentDialogComponent, {
      data: { data },
      width: '100%',
      disableClose: true
    });
    this.dialogRef.afterClosed()
      .subscribe(result => {
        if (!result) {
          return;
        }
        // this.completePackRequest('managerCompletePack');
      });
  }
  openCreateShipmentDialog() {
    this.dialogRef = this._matDialog.open(CreateShipmentDialogComponent, {
      disableClose: true
    });
    this.dialogRef.afterClosed()
      .subscribe(result => {
        if (!result) {
          return;
        }
        this.openEditShipmentDialog(result.shipment);
        // this.completePackRequest('managerCompletePack');
      });
  }

  focusMainInput() {
    if (this.inputEnabled) {
      setTimeout(() => this.mainInput.nativeElement.focus(), 10);
    }
  }
  onClearSearch(): void {
    this.searchTerm = '';
    this.applyFilter(this.searchTerm);
    this.focusMainInput();
  }
  onDelete(row) {
    this.deleteShipment.emit(row.shipmentID);
  }
}
