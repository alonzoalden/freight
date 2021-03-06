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
import { CustomerService } from "../../customer.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AppService } from "app/app.service";
import { NotificationsService } from "angular2-notifications";
import { EditCustomerDialogComponent } from "../edit-customer/edit-customer-dialog.component";
import { Customer } from "app/_shared/model/customer";
import * as fromCustomer from '../../state';
import { Store } from "@ngrx/store";
import { EditContactDialogComponent } from "../edit-contact/edit-contact-dialog.component";
@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  animations: [fuseAnimations],
})
export class CustomerListComponent implements OnInit, OnDestroy {
  @Input() customers: Customer[] = [];
  @Input() selected: Customer;
  @Input() isLoading: boolean;
  @Output() select = new EventEmitter<Customer>();
  @Output() deleteCustomer = new EventEmitter<any>();
  files: any;
  dataSource: any = new MatTableDataSource();
  displayedColumns = ['email', 'apEmail', 'companyName', 'actions'];
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
    private customerService: CustomerService,
    public _matDialog: MatDialog,
    private store: Store<fromCustomer.State>,
    private notifyService: NotificationsService
  ) {
    this._unsubscribeAll = new Subject();
    this.searchTerm = "";
    this.searchEnabled = false;
    this.inputEnabled = true;
  }
  ngOnChanges(changes): void {
    if (changes.customers) {
      this.dataSource = new MatTableDataSource<any>(this.customers || []);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.focusMainInput();
    }
  }
  ngOnInit(): void {
    this.focusMainInput();
  }

  ngOnDestroy(): void {
    //this.customerService.onCustomerSelected.next({});
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onSelect(customer: Customer): void {
    this.select.emit(customer);
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
      this.customerService.onCustomerSelected.next({});
    }
  }
  openEditCustomerDialog(data = {}): void {
    this.dialogRef = this._matDialog.open(EditCustomerDialogComponent, {
      panelClass: 'edit-fields-dialog',
      width: '100%',
      data: data
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (!response) {
          return;
        }
        // console.log(data);
        // console.log(typeof data);
        this.openEditContactDialog(this.selected);
      });
  }
  openEditContactDialog(data = {}): void {
    this.dialogRef = this._matDialog.open(EditContactDialogComponent, {
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
  onDelete(row: any): void {
    this.deleteCustomer.emit(row);
  }
}
