import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromLocation from '../state';
import { LocationPageActions } from '../state/actions';
import { Observable, Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import { Location } from 'app/_shared/model/location';


@Component({
  selector: 'location-shell',
  templateUrl: './location-shell.component.html',
  styleUrls: ['./location-shell.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class LocationShellComponent implements OnDestroy {
  locationEntities$: Observable<Location[]>;
  selectedLocation$: Observable<Location>;
  isLoading$: Observable<boolean>;

  private _unsubscribeAll: Subject<any>;

  constructor(
    public _matDialog: MatDialog,
    private store: Store<fromLocation.State>
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.locationEntities$ = this.store.select(fromLocation.getAllLocationList);
    this.selectedLocation$ = this.store.select(fromLocation.getSelectedLocation);
    this.isLoading$ = this.store.select(fromLocation.getIsLoading);
    this.store.dispatch(LocationPageActions.loadLocationList());
  }
  selectLocation(location: Location): void {
    this.store.dispatch(LocationPageActions.setCurrentLocation({ currentLocation: location }));
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }
}
