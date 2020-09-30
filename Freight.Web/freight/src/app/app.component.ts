import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAppState from './_state';
import { AppPageActions } from './_state/actions';

import { BusinessEntity } from './_shared/model/business-entity';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  businessEntities$: Observable<BusinessEntity[]>;
  selectedBusinessEntityId$: Observable<number>;

  constructor(private store: Store<fromAppState.State>,
              public oidcSecurityService: OidcSecurityService) { }

  ngOnInit(): void {
    this.businessEntities$ = this.store.select(fromAppState.getBusinessEntities);
    this.selectedBusinessEntityId$ = this.store.select(fromAppState.getCurrentBusinessEntityId);
    this.oidcSecurityService.checkAuth().subscribe((auth) => console.log('is authenticated', auth));
  }

  changeBusiness(e): void {
    this.store.dispatch(AppPageActions.setCurrentBusiness({ currentBusinessId: e.target.value }));
  }
}
