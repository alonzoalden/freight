import { Injectable } from '@angular/core';
import { CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';


@Injectable()
export class AuthGuard implements CanLoad {

    constructor(
        //private oauthService: OAuthService,
        public oidcSecurityService: OidcSecurityService,
        private router: Router,
    ) { }

    canLoad() {
        // console.log(this.oauthService.hasValidIdToken());
        if (this.oidcSecurityService.getToken()) {
            // console.log("passed guard");
            return true;
        } else {
            this.router.navigate(['/home']);
        }
        return false;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // return this.oauthService
        //     .loadDiscoveryDocumentAndTryLogin()
        //     .then((res) => {
        //         console.log(res);
        //         return this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken();
        //     });
        // if (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken()) {
        //     // console.log("passed guard");
        //     return true;
        // } else {
        //     this.router.navigate(['/']);
        // }
        // return false;
    }
}
