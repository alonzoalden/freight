import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromFee from '../state';
import { FeePageActions } from '../state/actions';
import { Observable, Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import { Fee } from 'app/_shared/model/fee';
import { takeUntil } from 'rxjs/operators';
import * as fromApp from 'app/_state';


@Component({
  selector: 'fee-shell',
  templateUrl: './fee-shell.component.html',
  styleUrls: ['./fee-shell.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class FeeShellComponent implements OnDestroy {
  feeEntities$: Observable<Fee[]>;
  selectedFee$: Observable<Fee>;
  isLoading$: Observable<boolean>;

  private _unsubscribeAll: Subject<any>;

  constructor(
    public _matDialog: MatDialog,
    private store: Store<fromFee.State>,
    private appStore: Store<fromApp.State>,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.feeEntities$ = this.store.select(fromFee.getAllFeeList);
    this.selectedFee$ = this.store.select(fromFee.getSelectedFee);
    this.isLoading$ = this.store.select(fromFee.getIsLoading);
    this.appStore.select(fromApp.getCurrentBusinessEntityId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(businessid => {
        if (businessid) {
          this.store.dispatch(FeePageActions.loadFeeList({ businessid }));
        }
      });
  }
  selectFee(fee: Fee): void {
    this.store.dispatch(FeePageActions.setCurrentFee({ currentFee: fee }));
  }
  deleteFee(feeid: any): void {
    this.store.dispatch(FeePageActions.deleteFee({ feeid }));
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }
}
