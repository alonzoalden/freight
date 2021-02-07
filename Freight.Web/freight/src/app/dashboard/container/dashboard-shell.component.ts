import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as fromDashboard from '../state';
import { AppPageActions } from '../../_state/actions';

import { BusinessEntity } from 'app/_shared/model/business-entity';

@Component({
  selector     : 'dashboard-shell',
  templateUrl: './dashboard-shell.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardShellComponent implements OnInit {
  businessEntities$: Observable<BusinessEntity[]>;
  selectedBusinessEntityId$: Observable<number>;
  isSelected$: Observable<boolean>;

  constructor(private store: Store<fromDashboard.State>) { }

  ngOnInit(): void {
    this.businessEntities$ = this.store.select(fromDashboard.getBusinessEntities);
    this.selectedBusinessEntityId$ = this.store.select(fromDashboard.getCurrentBusinessEntityId);
    this.isSelected$ = this.store.select(fromDashboard.selectedBussiness);
  }

  businessSelected(business: BusinessEntity): void {
    this.store.dispatch(AppPageActions.setCurrentBusiness({ currentBusinessId: business.id }));
  }

  test(): void {
    this.store.dispatch(AppPageActions.clearCurrentBusiness());
  }
}
