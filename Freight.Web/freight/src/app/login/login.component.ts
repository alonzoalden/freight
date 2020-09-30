import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import * as fromAppState from '../_state';
import { AppPageActions } from '../_state/actions';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  test$: Observable<string>;

  constructor(private store: Store<fromAppState.State>, private router: Router, public oidcSecurityService: OidcSecurityService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.oidcSecurityService.authorize();
    this.store.dispatch(AppPageActions.loadBusinesses());
    this.router.navigate(['']);
  }

  logout(): void {
    this.oidcSecurityService.logoff();
  }

  showToken(): void {
    const token = this.oidcSecurityService.getToken();
    console.log(token);

    const test = this.oidcSecurityService.getPayloadFromIdToken();
    console.log(test);

    this.store.dispatch(AppPageActions.getTest({ token }));
    this.test$ = this.store.select(fromAppState.getTest);
  }
}
