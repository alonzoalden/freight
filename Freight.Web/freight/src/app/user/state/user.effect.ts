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
        ofType(UserPageActions.loadUserList),
        concatMap(action => this.userService.getAllUserList()
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
}
