import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationsService } from 'angular2-notifications';

import { of } from 'rxjs';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';

import { UserService } from '../user.service';
import { UserPageActions, UserApiActions } from './actions';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private userService: UserService, private notifyService: NotificationsService) { }

  loadUserList$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(UserPageActions.loadUsersList),
        concatMap(action => this.userService.getUserList(action.businessid)
          .pipe(
            map(users => UserApiActions.loadUsersListSuccess({ users })),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(UserApiActions.loadUsersListFailure({ error }))
            })
          )
        )
      );
  });

  updateUser$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(UserPageActions.updateUser),
        concatMap(action => this.userService.updateUser(action.user)
          .pipe(
            map((user) => {
              this.notifyService.success('Success', `${user.email} has been updated.`, { timeOut:3500, clickToClose: true });
              return UserApiActions.updateUserSuccess({ user });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(UserApiActions.updateUserFailure({ error }))
            })
          )
        )
      );
  });
  createUser$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(UserPageActions.createUser),
        concatMap(action => this.userService.verifyUserEmail(btoa(action.user.email))
          .pipe(
            map((user) => {
              return UserPageActions.createVerifiedUser({ user });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(UserApiActions.createUserFailure({ error }))
            })
          )
        )
      );
  });
  createVerifiedUser$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(UserPageActions.createVerifiedUser),
        concatMap(action => this.userService.createUser(action.user)
          .pipe(
            map((user) => {
              this.notifyService.success('Success', `${user.email} has been created.`, { timeOut:3500, clickToClose: true });
              return UserApiActions.createUserSuccess({ user });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(UserApiActions.createUserFailure({ error }))
            })
          )
        )
      );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(UserPageActions.deleteUser),
        concatMap(action => this.userService.deleteUser(action.userid)
          .pipe(
            map((user) => {
              this.notifyService.success('Success', `User ${action.userid} has been deleted.`, { timeOut:3500, clickToClose: true });
              return UserApiActions.deleteUserSuccess({ itemid: action.userid });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(UserApiActions.deleteUserFailure({ error }))
            })
          )
        )
      );
  });
}
