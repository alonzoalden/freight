import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';

import * as fromDashboard from '../state';
import { AppPageActions } from '../../_state/actions';
import { DashboardPageActions } from '../state/actions';

import { BusinessEntity } from 'app/_shared/model/business-entity';
import { Business } from 'app/_shared/model/business';
import * as fromApp from 'app/_state';
import { ItemPageActions } from 'app/item/state/actions';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector     : 'dashboard-shell',
  templateUrl: './dashboard-shell.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardShellComponent implements OnInit {
  businessEntities$: Observable<Business[]>;
  selectedBusinessEntityId$: Observable<number>;
  dashboardInfo$: Observable<any>;
  isSelected$: Observable<boolean>;
  private _unsubscribeAll: Subject<any>;
  constructor(private store: Store<fromDashboard.State>, private appStore: Store<fromApp.State>) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.businessEntities$ = this.store.select(fromDashboard.getBusinessEntities);
    this.selectedBusinessEntityId$ = this.store.select(fromDashboard.getCurrentBusinessEntityId);
    this.dashboardInfo$ = this.store.select(fromDashboard.getDashboardInfo);
    this.isSelected$ = this.store.select(fromDashboard.selectedBussiness);
    
    this.appStore.select(fromApp.getCurrentBusinessEntityId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(businessid => {
        if (businessid) {
          this.store.dispatch(DashboardPageActions.loadDashboardInfo({ businessid }));
        }
      });
  }

  businessSelected(business: BusinessEntity): void {
    this.store.dispatch(AppPageActions.setCurrentBusiness({ currentBusinessId: business.id }));
  }

  test(): void {
    this.store.dispatch(AppPageActions.clearCurrentBusiness());
  }
}
