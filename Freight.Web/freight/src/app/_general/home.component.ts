import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
// import { OAuthService } from 'angular-oauth2-oidc';
import { AppService } from 'app/app.service';
import { Store } from '@ngrx/store';

import * as fromAppState from '../_state';
import { AppPageActions } from '../_state/actions';
import { OidcSecurityService } from 'angular-auth-oidc-client';
@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: fuseAnimations
})
export class HomeComponent implements OnInit {
    componentActive: boolean = true;
    appLoading: boolean = true;
    loadAPI: Promise<any>;
    id: any;
    member: any;
    composeForm: any;
    constructor(
        private _fuseConfigService: FuseConfigService,
        public _fuseSplashScreenService: FuseSplashScreenService,
        private _formBuilder: FormBuilder,
        public appService: AppService,
        private store: Store<fromAppState.State>, private router: Router, public oidcSecurityService: OidcSecurityService, 
    ) { }

    ngOnInit() {
        // Configure the layout
        this._fuseConfigService.config = this._fuseConfigService.hideLayoutConfig();
        this.composeForm = this.createProductForm();
    }

    ngOnDestroy() {
        this.componentActive = false;
    }
    login(): void {
    this.oidcSecurityService.authorize();
    this.store.dispatch(AppPageActions.loadBusinesses());
    this.router.navigate(['']);
    }
    
    logout(): void {
        this.oidcSecurityService.logoff();
    }
    createProductForm(): FormGroup {
        return this._formBuilder.group({
            PickupZipCode: [''],
            DeliveryZipCode: [''],
            pickupDate: [''],
        });
    }
    // getCurrentMemberAndRedirectToDashboard() {
    //     // this.appService.getCurrentMember().subscribe((member: Member) => {
    //     //     if (member && this.isLoggedin) {
    //     //         if (member.IsPM) {
    //     //             this.router.navigate(['/PM']);
    //     //         }
    //     //         else {
    //     //             this.router.navigate(['/dashboard']);
    //     //         }
    //     //     }
    //     // });
    // }

    get isLoggedin() {
        // return (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken());
        return false;
    }

    // get givenName() {
    //     const claims = this.oauthService.getIdentityClaims();
    //     if (!claims) {
    //         return null;
    //     }
    //     return claims['given_name'];
    // }

    // get familyName() {
    //     const claims = this.oauthService.getIdentityClaims();
    //     if (!claims) {
    //         return null;
    //     }
    //     return claims['family_name'];
    // }

    scrollToElement(element): void {
        console.log(element);
        const el = document.getElementById(element);
        if (el) {
            el.scrollIntoView({ block: 'center' });
        }
    }
}
