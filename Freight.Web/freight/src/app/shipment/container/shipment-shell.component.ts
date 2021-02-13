import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromShipment from '../state';
import { ShipmentPageActions } from '../state/actions';
import { Observable, Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import { Shipment } from '../../_shared/model/shipment';
import { takeUntil } from 'rxjs/operators';
import * as fromApp from 'app/_state';
@Component({
  selector: 'shipment-shell',
  templateUrl: './shipment-shell.component.html',
  styleUrls: ['./shipment-shell.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ShipmentShellComponent implements OnDestroy {
  shipmentEntities$: Observable<Shipment[]>;
  selectedShipment$: Observable<Shipment>;
  isLoading$: Observable<boolean>;

  private _unsubscribeAll: Subject<any>;

  constructor(
    public _matDialog: MatDialog,
    private store: Store<fromShipment.State>,
    private appStore: Store<fromApp.State>,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.shipmentEntities$ = this.store.select(fromShipment.getAllShipmentList);
    this.selectedShipment$ = this.store.select(fromShipment.getSelectedShipment);
    setTimeout(() => this.isLoading$ = this.store.select(fromShipment.getIsLoading), 1);
    this.appStore.select(fromApp.getCurrentBusinessEntityId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(businessID => {
        this.store.dispatch(ShipmentPageActions.loadShipmentList({ businessID }));
      });
    //this.store.dispatch(ShipmentPageActions.loadShipmentList());
  }
  selectItem(shipment: Shipment): void {
    this.store.dispatch(ShipmentPageActions.setCurrentShipment({ currentShipment: shipment }));
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }
}
