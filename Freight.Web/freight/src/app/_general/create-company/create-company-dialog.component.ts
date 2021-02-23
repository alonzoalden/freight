import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { WarehouseItemManagerService } from '../../warehouse-item-manager.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment';
import { ItemService } from 'app/item/item.service';
import { NotificationsService } from 'angular2-notifications';
import { Item } from 'app/_shared/model/item';
import { Store } from '@ngrx/store';
import * as fromItem from '../../item/state';
import * as fromApp from 'app/_state';
import { ItemApiActions, ItemPageActions } from '../../item/state/actions';
import { ItemEffects } from '../../item/state/item.effect';
import { Actions, ofType } from '@ngrx/effects';
import { AppService } from 'app/app.service';
import { User } from 'app/_shared/model/user';
import { Business } from 'app/_shared/model/business';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';

@Component({
  selector: 'create-company-dialog',
  templateUrl: './create-company-dialog.component.html',
  styleUrls: ['./create-company-dialog.component.scss'],
})
export class CreateCompanyDialogComponent implements OnInit, OnDestroy {
  //imageURL = environment.imageURL;
  currentUser: User;
  userForm: FormGroup;
  businessForm: FormGroup;
  selected: any;
  private _unsubscribeAll: Subject<any>;
  isSaving: boolean;
  userInfo: User;

  objectKeys = Object.keys;

  constructor(
    private store: Store<fromItem.State>,
    private _formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<CreateCompanyDialogComponent>,
    private warehouseItemManagerService: ItemService,
    public appService: AppService,
    private notifyService: NotificationsService,
    private itemEffects: ItemEffects,
    private readonly actions$: Actions,
    private oidcSecurityService: OidcSecurityService,
    private _fuseSplashScreenService: FuseSplashScreenService,
    @Inject(MAT_DIALOG_DATA) private inputData: User,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._fuseSplashScreenService.hide();
    this.selected = this.inputData;
    this.businessForm = this.createBusinessForm();

    this.actions$
      .pipe(
        takeUntil(this._unsubscribeAll),
        ofType(ItemApiActions.updateItemSuccess))
      .subscribe((data) => {
        this.matDialogRef.close(data);
      });
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  createBusinessForm(): FormGroup {
    return this._formBuilder.group({
      businessID: [this.selected?.businessID],
      userID: [this.selected?.userID],
      companyName: [''],
      isShipper: [false],
      is3PL: [false],
      isFFW: [false],
      firstName: [this.selected?.firstName],
      lastName: [this.selected?.lastName],
    });
  }
  createBusiness(): void {
    this.isSaving = true;
    // let businessdata = { ...this.businessForm.value };
    // delete businessdata.firstName;
    // delete businessdata.lastName;
    let userData = new User(this.inputData.userID, 0, this.inputData.email, this.businessForm.value.firstName, this.businessForm.value.lastName, '', '')
    this.appService.updateUser(userData)
      .subscribe(
        (user: User) => {
          this.isSaving = false;
          this.matDialogRef.close(user);
          this.notifyService.success('Success', `Your information has been saved.`, { timeOut: 3500, clickToClose: true });
        }
      )
    
    // this.appService.createBusiness(businessdata)
    //   .subscribe(
    //     (data: Business) => {
    //       let userData = new User(this.inputData.userID, data.businessID, this.inputData.email,
    //         this.businessForm.value.firstName, this.businessForm.value.lastName, '', '')
    //       this.appService.updateUser(userData)
    //         .subscribe(
    //           (user: User) => {
    //             this.isSaving = false;
    //             this.matDialogRef.close(user);
    //             this.notifyService.success('Success', `${businessdata.companyName} has been created.`, { timeOut: 3500, clickToClose: true });
    //           }
    //         )
    //     },
    //     error => {
    //       this.notifyService.error('Error', `${error}`, { clickToClose: true });
    //       this.isSaving = false;
    //     }
    //   );
  }
  create(): void {
    this.isSaving = true;
    this.appService.createBusiness(this.businessForm.value)
      .subscribe(
        (data: Business) => {
          // this.warehouseItemManagerService.onItemSelected.next(data);
          this.matDialogRef.close(data);
          this.notifyService.success('Success', `${data.companyName} has been created.`, { timeOut: 3500, clickToClose: true });
        },
        error => {
          this.notifyService.error('Error', `${error}`, { clickToClose: true });
          this.isSaving = false;
        }
      );
  }
  edit(): void {
    this.store.dispatch(ItemPageActions.updateItem({ item: this.userForm.value }));
  }
  logout() {
    this.oidcSecurityService.logoff();
  }

}
