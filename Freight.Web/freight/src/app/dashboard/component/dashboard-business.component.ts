import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { BusinessAccess } from '../../_shared/model/business-access';

import * as fromDashboard from '../state';
import { DashboardPageActions } from '../state/actions';

@Component({
  selector: 'dashboard-business',
  templateUrl: './dashboard-business.component.html'
})

export class DashboardBusinessComponent implements OnInit{
  @Input() id: number;
  accesses$: Observable<BusinessAccess>;

  constructor(private store: Store<fromDashboard.State>) { }

  ngOnInit(): void {
    this.store.dispatch(DashboardPageActions.loadBusinessAccess({ id: this.id }));
    this.accesses$ = this.store.select(fromDashboard.getBusinessAccesses);
  }
}
