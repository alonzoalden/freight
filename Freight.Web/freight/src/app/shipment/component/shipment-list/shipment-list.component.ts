import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  Input,
  EventEmitter,
  Output,
} from "@angular/core";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseSidebarService } from "@fuse/components/sidebar/sidebar.service";
import { ShipmentService } from "../../shipment.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AppService } from "app/app.service";
import { NotificationsService } from "angular2-notifications";
import { EditShipmentDialogComponent } from "../edit-shipment/edit-shipment-dialog.component";
import { Item } from "app/_shared/model/item";
import * as fromItem from '../../state';
import { Store } from "@ngrx/store";
import { Shipment } from "app/_shared/model/shipment";
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
  @Output() select = new EventEmitter<Item>();
  files: any;
  dataSource: any = new MatTableDataSource();
  displayedColumns = ['itemNumber', 'itemName', 'htsCode', 'fnsku', 'unitPrice', 'actions'];
  isLeadRole: boolean;
  filteredCourses: any[];
  currentCategory: string;
  searchTerm: string;
  searchEnabled: boolean;
  dialogRef: any;
  inputEnabled: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('mainInput') mainInput: ElementRef;
  private _unsubscribeAll: Subject<any>;

  constructor(
    public appService: AppService,
    private _fuseSidebarService: FuseSidebarService,
    private shipmentService: ShipmentService,
    public _matDialog: MatDialog,
    private store: Store<fromItem.State>,
    private notifyService: NotificationsService
  ) {
    this._unsubscribeAll = new Subject();
    this.searchTerm = "";
    this.searchEnabled = false;
    this.inputEnabled = true;
  }
  ngOnChanges(changes): void {
    if (changes.items) {
      this.dataSource = new MatTableDataSource<any>(this.shipments);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.focusMainInput();
    }
  }
  ngOnInit(): void {
    this.focusMainInput();
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
      height: '100%',
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
}
