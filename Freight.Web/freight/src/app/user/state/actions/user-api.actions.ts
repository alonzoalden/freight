import { createAction, props } from '@ngrx/store';
import { User } from 'app/_shared/model/user';

export const loadUsersListSuccess = createAction(
  '[User API] Load Users List Success',
  props<{ users: User[] }>()
);
export const loadUsersListFailure = createAction(
  '[User API] Load Users List Fail',
  props<{ error: string }>()
);

export const getUserSuccess = createAction(
  '[User API] Get User Success',
  props<{ user: User }>()
);
export const getUserFailure = createAction(
  '[User API] Get User Fail',
  props<{ error: string }>()
);

export const updateUserSuccess = createAction(
  '[User API] Update User Success',
  props<{ user: User }>()
);
export const updateUserFailure = createAction(
  '[User API] Update User Fail',
  props<{ error: string }>()
);

export const createUserSuccess = createAction(
  '[User API] Create User Success',
  props<{ user: User }>()
);
export const createUserFailure = createAction(
  '[User API] Create User Fail',
  props<{ error: string }>()
);

export const deleteUserSuccess = createAction(
  '[User API] Delete Item Success',
  props<{ itemid: any }>()
);
export const deleteUserFailure = createAction(
  '[User API] Delete Item Fail',
  props<{ error: string }>()
);