import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash-es';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/_general/navigation/navigation';
//import { OAuthService } from 'angular-oauth2-oidc';
import { AppService } from '../../../app.service';
// import { Member } from 'app/shared/class/member';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAppState from 'app/_state';
import { AppPageActions } from 'app/_state/actions';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { UserService } from 'app/user/user.service';
import { Business } from 'app/_shared/model/business';
import * as fromApp from 'app/_state';
import { BusinessUser, User } from 'app/_shared/model/user';
@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {
  horizontalNavbar: boolean;
  rightNavbar: boolean;
  hiddenNavbar: boolean;
  languages: any;
  navigation: any;
  selectedLanguage: any;
  companies: Business[];
  userInfo: User;
  isLoading: boolean;
  currentBusiness: Business;
  objectKeys = Object.keys;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _fuseSidebarService: FuseSidebarService,
    //private _translateService: TranslateService,
    // private oauthService: OAuthService,
    public appService: AppService,
    public router: Router,
    private store: Store<fromAppState.State>,
    private userService: UserService,
    private notifyService: NotificationsService,
    public oidcSecurityService: OidcSecurityService,
    //private appStore: Store<fromApp.State>,
  ) {
    // Set the defaults
    

    this.navigation = navigation;

    this._unsubscribeAll = new Subject();
    this.isLoading = false;
  }

  ngOnInit(): void {
    //this.businessEntities$ = this.store.select(fromAppState.getBusinessEntities);

    this.store.select(fromAppState.getBusinessEntities)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((companies: Business[]) => {
        this.companies = companies;
        if (this.userInfo?.businessID) {
          this.currentBusiness = this.companies.find(c => c.businessID == this.userInfo.businessID)
        }
      });

    this.store.select(fromAppState.getCurrentUser)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user: User) => {
        this.userInfo = user;
        if (this.companies) {
          this.currentBusiness = this.companies.find(c => c.businessID == this.userInfo.businessID)
        }
      });


    // Subscribe to the config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((settings) => {
        setTimeout(() => {
          this.horizontalNavbar = settings.layout.navbar.position === 'top';
          this.rightNavbar = settings.layout.navbar.position === 'right';
          this.hiddenNavbar = settings.layout.navbar.hidden === true;
        });
      });

    // Set the selected language from default languages
    //this.selectedLanguage = _.find(this.languages, { id: this._translateService.currentLang });
    this.selectedLanguage = {};

    // this.appService.userInfo
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe(user => {
    //         this.userInfo = user
    //     });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }

  setLanguage(lang): void {
    // Set the selected language for the toolbar
    this.selectedLanguage = lang;

    // Use the selected language for translations
    // this._translateService.use(lang.id);
  }
  logout() {
    this.oidcSecurityService.logoff();
    //this.oauthService.logOut();
    //this.router.navigate(['/']);
  }
  onUpdateCompany(company: BusinessUser) {
    const userData = {...this.userInfo};
    userData.businessID = company.businessID;
    this.isLoading = true;
    this.appService.updateUser(userData)
      .subscribe((user)=> {
        this.isLoading = false;
        this.currentBusiness = this.companies.find(c => c.businessID == company.businessID);
        // this.store.dispatch(AppPageActions.setCurrentBusiness({ currentBusinessId: company.businessID }));
        this.store.dispatch(AppPageActions.setCurrentUser({ user }));
        this.notifyService.success('Success', `Company has been updated to ${company.businessCompanyName}`, {timeOut: 4000, clickToClose: true });
      });
    
    // const updatedUserInfo = { ...this.appService.userInfo.value };
    // updatedUserInfo.WarehouseID = key;
    // this.isLoading = true;
    // this.appService.userInfo.next(updatedUserInfo);
    // this.notifyService.success('Success', `Location has been updated to
    //     ${this.appService.warehouseMap[updatedUserInfo.WarehouseID]}.`, {timeOut: 4000, clickToClose: true });
    // this.isLoading = false;
    // this.appService.editMemberLocation(updatedUserInfo)
    // .subscribe(
    //     data => {
    //         console.log(data);
    //         this.appService.userInfo.next(data);
    //         this.notifyService.success('Success', `Location has been updated to
    //             ${this.appService.warehouseMap[data.WarehouseID]}.`, {timeOut: 3000, clickToClose: true });
    //         this.isLoading = false;
    //     },
    //     err => {
    //         this.notifyService.error('Error', `${err}`, {timeOut: 3000, clickToClose: true});
    //         this.isLoading = false;
    //     },
    // );
  }
}
