import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import * as fromAppState from '../_state';
import { AppPageActions } from '../_state/actions';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})

export class LoginComponent implements OnInit {
  test$: Observable<string>;
  loginForm: FormGroup;

  constructor(
    private store: Store<fromAppState.State>,
    private router: Router,
    public oidcSecurityService: OidcSecurityService,
    private _fuseConfigService: FuseConfigService,
    private formBuilder: FormBuilder,
    private _fuseSplashScreenService: FuseSplashScreenService,) { }

  ngOnInit(): void {
    this._fuseConfigService.config = this._fuseConfigService.hideLayoutConfig();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this._fuseSplashScreenService.show();
    this.oidcSecurityService.authorize();
    //this.store.dispatch(AppPageActions.loadBusinesses());
    this.router.navigate(['/dashboard']);
    
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
