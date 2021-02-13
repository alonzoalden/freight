import { Component, Inject, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import * as fromAppState from './_state';
import { AppPageActions } from './_state/actions';

import { BusinessEntity } from './_shared/model/business-entity';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { takeUntil } from 'rxjs/operators';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { AppService } from './app.service';
import { navigation } from 'app/_general/navigation/navigation';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateCompanyDialogComponent } from './_general/create-company/create-company-dialog.component';
import { UserService } from './user/user.service';
import { Business } from './_shared/model/business';
import { User } from './_shared/model/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  fuseConfig: any;
  navigation: any;
  businessEntities$: Observable<Business[]>;
  selectedBusinessEntityId$: Observable<number>;
  dialogRef: any;
  private _unsubscribeAll: Subject<any>;
  constructor(
    @Inject(DOCUMENT) private document: any,
    private _fuseConfigService: FuseConfigService,
    private _fuseNavigationService: FuseNavigationService,
    private _fuseSidebarService: FuseSidebarService,
    private _fuseSplashScreenService: FuseSplashScreenService,
    private _fuseProgressBarService: FuseProgressBarService,
    //private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    //private _translateService: TranslateService,
    private _platform: Platform,
    private appService: AppService,
    private userService: UserService,
    private router: Router,
    private store: Store<fromAppState.State>,
    public oidcSecurityService: OidcSecurityService,
    public _matDialog: MatDialog) { }

  ngOnInit(): void {
    this.initialize();
    this.businessEntities$ = this.store.select(fromAppState.getBusinessEntities);
    this.selectedBusinessEntityId$ = this.store.select(fromAppState.getCurrentBusinessEntityId);
    if (this.router.url == '/' && this.oidcSecurityService.getToken()) {
      //this.router.navigate(['/dashboard']);
      //this._fuseSplashScreenService.hide();
    }
    this.oidcSecurityService.checkAuth()
      .subscribe(
        (auth) => {
          if (!auth) {
            this.router.navigate(['/home']);
            this._fuseSplashScreenService.hideFaster();
          } else {

            if (this.router.url == '/') {
              this.router.navigate(['/dashboard']);
            }

            this.userService.getCurrentUser()
              .subscribe(
                (user) => {
                  if (!user.businessID) {
                    // If user is not assigned to company:
                    this.openCreateCompanyDialog(user);

                  } else {
                    this.store.dispatch(AppPageActions.setCurrentUser({ user }));
                    this.store.dispatch(AppPageActions.setCurrentBusiness({ currentBusinessId: user.businessID }));
                    this.store.dispatch(AppPageActions.loadBusinesses({ userID: user.userID }));
                    this.router.navigate(['/dashboard']);
                    this._fuseSplashScreenService.hide();
                  }
                },
                (err) => {
                  window.location.reload();
                  console.log(err);
                },
              );
          }
        },
        (err) => {
          window.location.reload();
          console.log(err);
        }
        );
  }

  changeBusiness(e): void {
    this.store.dispatch(AppPageActions.setCurrentBusiness({ currentBusinessId: e.target.value }));
  }
  initialize(): void {
    // Get default navigation
    this.navigation = navigation;

    // Register the navigation to the service
    this._fuseNavigationService.register('main', this.navigation);

    // Set the main navigation as our current navigation
    this._fuseNavigationService.setCurrentNavigation('main');


    // Add languages
    //this._translateService.addLangs(['en', 'tr']);

    // Set the default language
    //this._translateService.setDefaultLang('en');

    // Set the navigation translations
    //this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

    // Use a language
    //this._translateService.use('en');

    /**
     * ----------------------------------------------------------------------------------------------------
     * ngxTranslate Fix Start
     * ----------------------------------------------------------------------------------------------------
     */

    /**
     * If you are using a language other than the default one, i.e. Turkish in this case,
     * you may encounter an issue where some of the components are not actually being
     * translated when your app first initialized.
     *
     * This is related to ngxTranslate module and below there is a temporary fix while we
     * are moving the multi language implementation over to the Angular's core language
     * service.
     **/

    // Set the default language to 'en' and then back to 'tr'.
    // '.use' cannot be used here as ngxTranslate won't switch to a language that's already
    // been selected and there is no way to force it, so we overcome the issue by switching
    // the default language back and forth.
    /**
     setTimeout(() => {
        this._translateService.setDefaultLang('en');
        this._translateService.setDefaultLang('tr');
     });
     */

    /**
     * ----------------------------------------------------------------------------------------------------
     * ngxTranslate Fix End
     * ----------------------------------------------------------------------------------------------------
     */

    // Add is-mobile class to the body if the platform is mobile
    if (this._platform.ANDROID || this._platform.IOS) {
      this.document.body.classList.add('is-mobile');
    }

    // Set the private defaults
    this._unsubscribeAll = new Subject();
    // Subscribe to config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {

        this.fuseConfig = config;

        // Boxed
        if (this.fuseConfig.layout.width === 'boxed') {
          this.document.body.classList.add('boxed');
        }
        else {
          this.document.body.classList.remove('boxed');
        }

        // Color theme - Use normal for loop for IE11 compatibility
        for (let i = 0; i < this.document.body.classList.length; i++) {
          const className = this.document.body.classList[i];

          if (className.startsWith('theme-')) {
            this.document.body.classList.remove(className);
          }
        }

        this.document.body.classList.add(this.fuseConfig.colorTheme);
      });
  }
  openCreateCompanyDialog(data: User): void {
    this.dialogRef = this._matDialog.open(CreateCompanyDialogComponent, {
      panelClass: 'edit-fields-dialog',
      disableClose: true,
      data: data
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (!response) {
          return;
        }
        this.store.dispatch(AppPageActions.setCurrentUser({ user: response }));
        this.store.dispatch(AppPageActions.setCurrentBusiness({ currentBusinessId: response.BusinessID }));
        this.store.dispatch(AppPageActions.loadBusinesses({ userID: response.userID }));
        this.router.navigate(['/dashboard']);
      });
  }
}


