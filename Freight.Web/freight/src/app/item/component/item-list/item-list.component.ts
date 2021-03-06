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
import { ConfirmationDialogComponent } from "app/_shared/confirmation-dialog/confirmation-dialog.component";
@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  animations: [fuseAnimations],
})
export class ItemListComponent implements OnInit, OnDestroy {
  @Input() items: Item[] = [];
  @Input() selected: Item;
  @Input() isLoading: boolean;
  @Output() select = new EventEmitter<Item>();
  @Output() deleteItem = new EventEmitter<any>();
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
  ngOnChanges(changes): void {
    if (changes.items) {
      this.dataSource = new MatTableDataSource<any>(this.items || []);
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
  onDelete(itemid: any): void {
    this.dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      data: { message: `Are you sure you want to delete ${this.selected.itemName}?` },
    });
    this.dialogRef.afterClosed()
      .subscribe((response) => {
        if (response) {
          this.deleteItem.emit(itemid);
        }
      });

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
  }
  applyFilter(filterValue: string) {
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      this.itemService.onItemSelected.next({});
    }
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
