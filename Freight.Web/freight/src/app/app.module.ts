import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { filter } from 'rxjs/operators';

import { AuthModule, LogLevel, OidcConfigService, PublicEventsService, EventTypes } from 'angular-auth-oidc-client';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import * as fromApp from './_state/app.reducer';
import { AppEffects } from './_state/app.effect';

import { HomeComponent } from './_general/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './_general/page-not-found.component';

export function configureAuth(oidcConfigService: OidcConfigService): () => any {
  return () =>
    oidcConfigService.withConfig({
      stsServer: 'https://localhost:5001',
      redirectUrl: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      clientId: 'angularfreightappclient',
      scope: 'openid profile freightapiscope',
      responseType: 'code',
      silentRenew: true,
      silentRenewUrl: `${window.location.origin}/silent-renew.html`,
      renewTimeBeforeTokenExpiresInSeconds: 10,
      // logLevel: environment.production ? LogLevel.None : LogLevel.Debug,
    });
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ app: fromApp.appReducer }),
    StoreDevtoolsModule.instrument({
      name: 'Freight App DevTools',
      maxAge: 25
    }),
    EffectsModule.forRoot([AppEffects]),
    AuthModule.forRoot()
  ],
  providers: [
    OidcConfigService,
      {
        provide: APP_INITIALIZER,
        useFactory: configureAuth,
        deps: [OidcConfigService],
        multi: true,
      }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private readonly eventService: PublicEventsService) {
    this.eventService
        .registerForEvents()
        .pipe(filter((notification) => notification.type === EventTypes.ConfigLoaded))
        .subscribe((config) => console.log('ConfigLoaded', config));
  }
}
