import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
// import { OAuthService } from 'angular-oauth2-oidc';
import { AppService } from 'app/app.service';
import { Subject } from 'rxjs';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: fuseAnimations
})
export class HomeComponent {
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
        public appService: AppService
    ) { }

    login() {
        // this.oauthService.initImplicitFlow();
    }
    ngOnInit() {
        // Configure the layout
        this._fuseConfigService.config = this._fuseConfigService.hideLayoutConfig();
        this.composeForm = this.createProductForm();
    }

    ngOnDestroy() {
        this.componentActive = false;
    }
    createProductForm(): FormGroup {
        return this._formBuilder.group({
            PickupZipCode: [''],
            DeliveryZipCode: [''],
            pickupDate: [''],
        });
    }
    detectBrowser() {
        const isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    }
    getCurrentMemberAndRedirectToDashboard() {
        // this.appService.getCurrentMember().subscribe((member: Member) => {
        //     if (member && this.isLoggedin) {
        //         if (member.IsPM) {
        //             this.router.navigate(['/PM']);
        //         }
        //         else {
        //             this.router.navigate(['/dashboard']);
        //         }
        //     }
        // });
    }

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


    logout() {
        //this.oauthService.logOut();
    }

    scrollToElement(element): void {
        console.log(element);
        const el = document.getElementById(element);
        if (el) {
            el.scrollIntoView({ block: 'center' });
        }
    }
}
