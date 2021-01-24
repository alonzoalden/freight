import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { fuseAnimations } from "@fuse/animations";
import { FuseSidebarService } from "@fuse/components/sidebar/sidebar.service";
import { ItemService } from "../item.service";
import { MatTableDataSource } from "@angular/material/table";
import { environment } from "environments/environment";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AppService } from "app/app.service";
import { NotificationsService } from "angular2-notifications";
import { EditItemDialogComponent } from "../dialogs/edit-item/edit-item.component";

@Component({
  selector: "item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: [fuseAnimations],
})
export class ItemListComponent implements OnInit, OnDestroy {
  //imageURL = environment.imageURL;
  files: any;
  dataSource: any;
  displayedColumns = ["Actions", "ItemName", "detail-button"];
  selected: any;
  isLoading: boolean;
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
  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    public appService: AppService,
    private _fuseSidebarService: FuseSidebarService,
    private itemService: ItemService,
    public _matDialog: MatDialog,
    private notifyService: NotificationsService
  ) {
    this._unsubscribeAll = new Subject();
    this.searchTerm = "";
    this.searchEnabled = false;
    this.inputEnabled = true;
  }

  ngOnInit(): void {
    this.itemService.onItemSelected
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((selected) => {
        this.selected = selected;
      });
    this.isLoading = true;

    this.itemService.allItemList
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((items) => {
        if (items.length) {
          this.dataSource = new MatTableDataSource<any>(items);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.isLoading = false;
          this.focusMainInput();
        }
      });
    this.focusMainInput();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.itemService.onItemSelected.next({});
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onSelect(selected: any): void {
    if (this.selected.ItemID !== selected.ItemID) {
      this.itemService.onItemSelected.next({});
    }
    // Use setTimeout to repeat animation
    setTimeout(
      () =>
        this.itemService.onItemSelected.next(selected),
      0
    );
    this.itemService
      .getItemDimension(selected.ItemID)
      .subscribe();
    // .subscribe(item => this.selected.Dimensions.push(item));
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
  focusMainInput() {
    if (this.inputEnabled) {
      setTimeout(() => this.mainInput.nativeElement.focus(), 10);
    }
  }
}
