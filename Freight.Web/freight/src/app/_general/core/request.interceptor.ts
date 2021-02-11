import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public oidcSecurityService: OidcSecurityService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userToken = this.oidcSecurityService.getToken();
        const modifiedReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${userToken}`),
        });
        return next.handle(modifiedReq);
    }
}
