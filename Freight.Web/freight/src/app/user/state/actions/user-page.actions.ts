import { createAction, props } from '@ngrx/store';
import { User } from 'app/_shared/model/user';

export const loadUserList = createAction(
  '[User Page] Load User List'
);
export const getUser = createAction(
  '[User Page] Get User',
  props<{ user: User }>()
);
export const updateUser = createAction(
  '[User Page] Update User',
  props<{ user: User }>()
);
export const createUser = createAction(
  '[User Page] Create User',
  props<{ user: User }>()
);
export const setCurrentUser = createAction(
  '[User Page] Set Current User',
  props<{ currentUser: User }>()
);
export const deleteUser = createAction(
  '[User Page] Delete User',
  props<{ userid: any }>()
);