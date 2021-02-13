import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromBusiness from '../state';
import { BusinessPageActions } from '../state/actions';
import { Observable, Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import { Business } from 'app/_shared/model/business';
import * as fromAppState from 'app/_state';
import { User } from 'app/_shared/model/user';

@Component({
  selector: 'business-shell',
  templateUrl: './business-shell.component.html',
  styleUrls: ['./business-shell.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class BusinessShellComponent implements OnDestroy {
  userInfo$: Observable<User>;
  businessEntities$: Observable<Business[]>;
  selectedBusiness$: Observable<Business>;
  isLoading$: Observable<boolean>;

  private _unsubscribeAll: Subject<any>;

  constructor(
    public _matDialog: MatDialog,
    private appStore: Store<fromAppState.State>,
    private store: Store<fromBusiness.State>
    
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.businessEntities$ = this.store.select(fromBusiness.getAllBusinessList);
    this.selectedBusiness$ = this.store.select(fromBusiness.getSelectedBusiness);
    this.isLoading$ = this.store.select(fromBusiness.getIsLoading);
    this.userInfo$ = this.store.select(fromAppState.getCurrentUser);

    this.userInfo$.subscribe(user => {
      if (user && user.userID) {
        this.store.dispatch(BusinessPageActions.loadBusinessList({userid: user.userID}));
      }
    })

  }
  selectBusiness(business: Business): void {
    this.store.dispatch(BusinessPageActions.setCurrentBusiness({ currentBusiness: business }));
  }
  deleteBusiness(businessid: any): void {
    this.store.dispatch(BusinessPageActions.deleteBusiness({ businessid }));
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }
}
