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
import { BusinessService } from "../../business.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AppService } from "app/app.service";
import { NotificationsService } from "angular2-notifications";
import { EditBusinessDialogComponent } from "../edit-business/edit-business-dialog.component";
import { Business } from "app/_shared/model/business";
import * as fromBusiness from '../../state';
import { Store } from "@ngrx/store";
import { FuseConfig } from "@fuse/types";
import { FuseConfigService } from "@fuse/services/config.service";
import { User } from "app/_shared/model/user";
import { BusinessPageActions } from '../../state/actions';
@Component({
  selector: 'business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.scss'],
  animations: [fuseAnimations],
})
export class BusinessListComponent implements OnInit, OnDestroy {
  @Input() userInfo: User;
  @Input() businesss: Business[] = [];
  @Input() selected: Business;
  @Input() isLoading: boolean;
  @Output() select = new EventEmitter<Business>();
  @Output() deleteBusiness = new EventEmitter<any>();
  files: any;
  dataSource: any = new MatTableDataSource();
  displayedColumns = ['companyName', 'isShipper', 'is3PL', 'isFFW'];
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
    private businessService: BusinessService,
    public _matDialog: MatDialog,
    private store: Store<fromBusiness.State>,
    private notifyService: NotificationsService,
    private _fuseConfigService: FuseConfigService,
  ) {
    this._unsubscribeAll = new Subject();
    this.searchTerm = "";
    this.searchEnabled = false;
    this.inputEnabled = true;
  }
  ngOnChanges(changes): void {
    if (changes.businesss) {
      this.dataSource = new MatTableDataSource<any>(this.businesss);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.focusMainInput();
    }
  }
  ngOnInit(): void {
    if (!this.userInfo.businessID) {
      this._fuseConfigService.config = this._fuseConfigService.hideLayoutConfig();
    }
    this.focusMainInput();
  }
  resetLayout() {
    this._fuseConfigService.config = this._fuseConfigService.resetToDefaults();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onSelect(business: Business): void {
    this.select.emit(business);
  }
  onDelete(id: any): void {
    this.deleteBusiness.emit(id);
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
      this.businessService.onBusinessSelected.next({});
    }
  }
  openEditBusinessDialog(data = {}): void {
    
    this.dialogRef = this._matDialog.open(EditBusinessDialogComponent, {
      panelClass: 'edit-fields-dialog',
      width: '100%',
      data: {data, userInfo: this.userInfo}
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (!response) {
          return;
        }
        this.store.dispatch(BusinessPageActions.loadBusinessList({userid: this.userInfo.userID}));
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
