import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAppState from '../../_state';
import { UserState } from './user.reducer';
import { AppState } from '../../_state/app.reducer';

export interface State extends fromAppState.State {
  user: UserState;
}

const getuserFeatureState = createFeatureSelector<UserState>('user');
const getAppFeatureState = createFeatureSelector<AppState>('app');

export const getAlluserList = createSelector(
  getuserFeatureState,
  state => state.allUsers
);
export const getSelecteduser = createSelector(
  getuserFeatureState,
  state => state.selectedUser
);
export const getIsSaving = createSelector(
  getuserFeatureState,
  state => state.isSaving
);
export const getIsLoading = createSelector(
  getuserFeatureState,
  state => state.isLoading
);
