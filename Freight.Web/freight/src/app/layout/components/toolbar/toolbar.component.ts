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
    userStatusOptions: any[];
    userInfo: any;
    isLoading: boolean;
    objectKeys = Object.keys;
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        //private _translateService: TranslateService,
        // private oauthService: OAuthService,
        public appService: AppService,
        private router: Router,
        private store: Store<fromAppState.State>,

        public oidcSecurityService: OidcSecurityService
    ) {
        // Set the defaults
        this.userStatusOptions = [
            {
                title: 'Online',
                icon: 'icon-checkbox-marked-circle',
                color: '#4CAF50'
            },
            {
                title: 'Away',
                icon: 'icon-clock',
                color: '#FFC107'
            },
            {
                title: 'Do not Disturb',
                icon: 'icon-minus-circle',
                color: '#F44336'
            },
            {
                title: 'Invisible',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#BDBDBD'
            },
            {
                title: 'Offline',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#616161'
            }
        ];

        this.languages = [
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            {
                id: 'tr',
                title: 'China',
                flag: 'cn'
            }
        ];

        this.navigation = navigation;

        this._unsubscribeAll = new Subject();
        this.isLoading = false;
    }

    ngOnInit(): void {
        //this.businessEntities$ = this.store.select(fromAppState.getBusinessEntities);
        
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
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

    search(value): void {
        // Do your search here...
        console.log(value);
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
    onUpdateLocation(key) {
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
