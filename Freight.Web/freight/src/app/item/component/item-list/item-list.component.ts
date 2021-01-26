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
import { ItemService } from "../../item.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AppService } from "app/app.service";
import { NotificationsService } from "angular2-notifications";
import { EditItemDialogComponent } from "../../component/edit-item/edit-item-dialog.component";
import { Item } from "app/_shared/model/item";
import * as fromItem from '../../state';
import { Store } from "@ngrx/store";
@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  animations: [fuseAnimations],
})
export class ItemListComponent implements OnInit, OnDestroy {
  @Input() items: Item[] = [];
  @Input() selected: Item;
  @Output() select = new EventEmitter<Item>();
  files: any;
  dataSource: any;
  displayedColumns = ['itemNumber', 'itemName', 'htsCode', 'fnsku', 'unitPrice', 'actions'];
  isLoading: boolean = true;
  isLeadRole: boolean;
  filteredCourses: any[];
  currentCategory: string;
  searchTerm: string;
  searchEnabled: boolean;
  dialogRef: any;
  inputEnabled: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("mainInput") mainInput: ElementRef;
  private _unsubscribeAll: Subject<any>;

  constructor(
    public appService: AppService,
    private _fuseSidebarService: FuseSidebarService,
    private itemService: ItemService,
    public _matDialog: MatDialog,
    private store: Store<fromItem.State>,
    private notifyService: NotificationsService
  ) {
    this._unsubscribeAll = new Subject();
    this.searchTerm = "";
    this.searchEnabled = false;
    this.inputEnabled = true;
  }
  ngOnChanges(): void {
    if (this.items && this.items.length) {
      this.dataSource = new MatTableDataSource<any>(this.items);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
      this.focusMainInput();
    }
  }
  ngOnInit(): void {
    this.focusMainInput();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.itemService.onItemSelected.next({});
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onSelect(row: Item): void {
    this.select.emit(row);
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
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.itemService.onItemSelected.next({});
  }
  openEditItemDialog(data = {}): void {
    this.dialogRef = this._matDialog.open(EditItemDialogComponent, {
      panelClass: 'edit-fields-dialog',
      width: '100%',
      data: data
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (!response) {
          return;
        }
        this.dataSource.data.push(response);
      });
  }
  focusMainInput() {
    if (this.inputEnabled) {
      setTimeout(() => this.mainInput.nativeElement.focus(), 10);
    }
  }
}
