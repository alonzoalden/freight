import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { SignupComponent } from './signup/signup.component';
import { PageNotFoundComponent } from './_general/page-not-found.component';
import { PasswordAssistanceComponent } from './_general/password-assistance.component';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { fuseConfig } from './_general/fuse-config';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { ItemModule } from './item/item.module';
import { UserModule } from './user/user.module';
import { ShipmentModule } from './shipment/shipment.module';
import { LocationModule } from './location/location.module';
import { CustomerModule } from './customer/customer.module';
import { BusinessModule } from './business/business.module';
import { FeeModule } from './fee/fee.module';
import { ConfirmationDialogComponent } from 'app/_shared/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from 'app/_shared/confirmation-dialog/confirmation-dialog.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { FakeDbService } from 'app/_shared/fake-db/fake-db.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { CreateCompanyDialogComponent } from 'app/_general/create-company/create-company-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { AuthGuard } from 'app/_general/auth/auth.guard';
import { TokenInterceptor } from "app/_general/core/request.interceptor";
import { ResponseInterceptor } from "app/_general/core/response.interceptor";
import { keys } from "../../environment-config";


export function configureAuth(oidcConfigService: OidcConfigService): () => any {
  return () =>
    oidcConfigService.withConfig({
      stsServer: keys.stsServer,
      redirectUrl: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      clientId: keys.clientId,
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
    SignupComponent,
    PageNotFoundComponent,
    PasswordAssistanceComponent,
    CreateCompanyDialogComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ app: fromApp.appReducer }),
    StoreDevtoolsModule.instrument({
      name: 'Freight App DevTools',
      maxAge: 25
    }),
    EffectsModule.forRoot([AppEffects]),
    AuthModule.forRoot(),
    // Fuse modules
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,
    RouterModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatMomentDateModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    SimpleNotificationsModule.forRoot(),
    LayoutModule,
    ItemModule,
    ShipmentModule,
    LocationModule,
    FeeModule,
    UserModule,
    CustomerModule,
    BusinessModule,
    InMemoryWebApiModule.forRoot(FakeDbService, {
      delay: 0,
      passThruUnknownUrl: true
    }),
  ],
  providers: [
    AuthGuard,
    FakeDbService,
    OidcConfigService,
    ConfirmationDialogService,
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuth,
      deps: [OidcConfigService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})

export class AppModule {
  constructor(private readonly eventService: PublicEventsService) {
    this.eventService
      .registerForEvents()
      .pipe(filter((notification) => notification.type === EventTypes.ConfigLoaded))
      .subscribe((config) => {});
  }
}
