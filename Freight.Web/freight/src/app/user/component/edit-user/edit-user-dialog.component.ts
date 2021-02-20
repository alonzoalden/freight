import { Component, Inject, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { WarehouseUserManagerService } from '../../warehouse-user-manager.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment';
import { UserService } from 'app/user/user.service';
import { NotificationsService } from 'angular2-notifications';
import { BusinessUser, User } from 'app/_shared/model/user';
import { Store } from '@ngrx/store';
import * as fromUser from '../../state';
import { UserApiActions, UserPageActions } from '../../state/actions';
import { UserEffects } from '../../state/user.effect';
import { Actions, ofType } from '@ngrx/effects';
import { AppService } from 'app/app.service';
import * as fromApp from 'app/_state';
@Component({
  selector: 'edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss'],
})
export class EditUserDialogComponent implements OnInit, OnDestroy {
  //imageURL = environment.imageURL;
  showExtraToFields: boolean;
  userForm: FormGroup;
  selectedUser: BusinessUser;
  private _unsubscribeAll: Subject<any>;
  isSaving: boolean;
  businessID: any;

  objectKeys = Object.keys;
  @ViewChild('mainInput') mainInput: ElementRef;
  constructor(
    private store: Store<fromUser.State>,
    private appStore: Store<fromApp.State>,
    private _formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<EditUserDialogComponent>,
    private userService: UserService,
    public appService: AppService,
    private notifyService: NotificationsService,
    private userEffects: UserEffects,
    private readonly actions$: Actions,
    @Inject(MAT_DIALOG_DATA) private inputData: any,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {

    this.selectedUser = this.inputData;
    this.userForm = this.inviteUserForm();
    this.focusMainInput();
    this.appStore.select(fromApp.getCurrentBusinessEntityId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(businessid => {
        this.businessID = businessid;
      });

    this.store.select(fromUser.getIsSaving)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(loading => {
        this.isSaving = loading
      });

    this.actions$
      .pipe(
        takeUntil(this._unsubscribeAll),
        ofType(UserApiActions.updateUserSuccess))
      .subscribe((data) => {
        this.matDialogRef.close(data);
      });

    this.actions$
      .pipe(
        takeUntil(this._unsubscribeAll),
        ofType(UserApiActions.createUserSuccess))
      .subscribe((data) => {
        this.matDialogRef.close(data);
      });
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  inviteUserForm(): FormGroup {
    return this._formBuilder.group({
      userID: [this.selectedUser.userID],
      businessID: [this.selectedUser.businessID],
      email: [{value: this.selectedUser.userEmail, disabled: this.selectedUser.userID}],
      userFirstName: [this.selectedUser.userFirstName],
      userLastName: [this.selectedUser.userLastName],
      isAdmin: [this.selectedUser.isAdmin],
      isActive: [this.selectedUser.isActive],
      isOwner: [this.selectedUser.isOwner],
    });
  }
  save(): void {
    if (this.selectedUser.userID) {
      this.edit();
    } else {
      this.create();
    }
  }
  focusMainInput(): void {
    
  }
  create(): void {
    this.store.dispatch(UserPageActions.createUser({ user: this.userForm.value }));
  }
  edit(): void {
    const dataToSend = this.userForm.value;
    dataToSend.userEmail = this.selectedUser.userEmail;
    this.store.dispatch(UserPageActions.updateUser({ user: dataToSend }));
  }
}
