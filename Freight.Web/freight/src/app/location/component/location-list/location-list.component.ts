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
import { LocationService } from "../../location.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AppService } from "app/app.service";
import { NotificationsService } from "angular2-notifications";
import { EditLocationDialogComponent } from "../edit-location/edit-location-dialog.component";
import { Location } from "app/_shared/model/location";
import * as fromLocation from '../../state';
import { Store } from "@ngrx/store";
@Component({
  selector: 'location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss'],
  animations: [fuseAnimations],
})
export class LocationListComponent implements OnInit, OnDestroy {
  @Input() locations: Location[] = [];
  @Input() selected: Location;
  @Input() isLoading: boolean;
  @Output() select = new EventEmitter<Location>();
  files: any;
  dataSource: any;
  displayedColumns = ['locationName', 'actions'];
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
    private locationService: LocationService,
    public _matDialog: MatDialog,
    private store: Store<fromLocation.State>,
    private notifyService: NotificationsService
  ) {
    this._unsubscribeAll = new Subject();
    this.searchTerm = "";
    this.searchEnabled = false;
    this.inputEnabled = true;
  }
  ngOnChanges(changes): void {
    if (changes.locations && changes.locations.currentValue?.length) {
      this.dataSource = new MatTableDataSource<any>(this.locations);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.focusMainInput();
    }
  }
  ngOnInit(): void {
    this.focusMainInput();
  }

  ngOnDestroy(): void {
    //this.locationService.onLocationSelected.next({});
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onSelect(location: Location): void {
    this.select.emit(location);
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
      this.locationService.onLocationSelected.next({});
    }
  }
  openEditLocationDialog(data = {}): void {
    this.dialogRef = this._matDialog.open(EditLocationDialogComponent, {
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
