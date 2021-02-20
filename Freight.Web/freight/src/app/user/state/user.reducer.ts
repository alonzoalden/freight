import { createReducer, on } from '@ngrx/store';
import { UserApiActions, UserPageActions } from './actions';
import { BusinessUser, User } from 'app/_shared/model/user';

export interface UserState {
  allUsers: BusinessUser[] | any[];
  selectedUser: User;
  isSaving: boolean;
  isLoading: boolean,
  error: string;
}

const initalState: UserState = {
  allUsers: null,
  selectedUser: null,
  isSaving: false,
  isLoading: false,
  error: ''
};

export const userReducer = createReducer<UserState>(
  initalState,
  on(UserPageActions.loadUserList, (state, action): UserState => {
    return {
      ...state,
      isLoading: true,
      error: ''
    };
  }),
  on(UserApiActions.loadUsersListSuccess, (state, action): UserState => {
    return {
      ...state,
      allUsers: action.users,
      isLoading: false,
      error: ''
    };
  }),
  on(UserApiActions.loadUsersListFailure, (state, action): UserState => {
    return {
      ...state,
      allUsers: null,
      isLoading: false,
      error: action.error
    };
  }),
  on(UserPageActions.createUser, (state, action): UserState => {
    return {
      ...state,
      isSaving: true
    };
  }),
  on(UserApiActions.createUserSuccess, (state, action): UserState => {
    return {
      ...state,
      allUsers: [action.user, ...state.allUsers],
      selectedUser: action.user,
      isSaving: false,
      error: ''
    };
  }),
  on(UserApiActions.createUserFailure, (state, action): UserState => {
    return {
      ...state,
      isSaving: false,
      selectedUser: null,
      error: ''
    };
  }),
  on(UserApiActions.loadUsersListFailure, (state, action): UserState => {
    return {
      ...state,
      allUsers: null,
      isLoading: false,
      error: action.error
    };
  }),
  on(UserPageActions.setCurrentUser, (state, action): UserState => {
    return {
      ...state,
      selectedUser: action.currentUser
    };
  }),
  on(UserPageActions.updateUser, (state, action): UserState => {
    return {
      ...state,
      isSaving: true,
      selectedUser: action.user
    };
  }),
  on(UserApiActions.updateUserSuccess, (state, action): UserState => {
    const index = state.allUsers.findIndex((x)=> x.userID == action.user.userID);
    const list = [...state.allUsers];
    list.splice(index, 1, action.user);
    return Object.assign({
      isSaving: false,
      allUsers: list,
      selectedUser: action.user
    });
  }),
  on(UserApiActions.updateUserFailure, (state, action): UserState => {
    return {
      ...state,
      isSaving: false,
    };
  }),
  
);
