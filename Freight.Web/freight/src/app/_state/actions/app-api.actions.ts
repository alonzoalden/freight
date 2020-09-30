import { createAction, props } from '@ngrx/store';

import { BusinessEntity } from '../../_shared/model/business-entity';

export const loadBusinessesSuccess = createAction(
    '[App API] Load Business Entity List Success',
    props<{ businesses: BusinessEntity[] }>()
);

export const loadBusinessesFailure = createAction(
    '[App API] Load Business Entity List Fail',
    props<{ error: string }>()
);

export const loginUserSuccess = createAction(
    '[App API] Login User Success'
);

export const loginUserFailure = createAction(
    '[App API] Login User Fail'
);

export const logoutUserSuccess = createAction(
    '[App API] Logout User Success'
);

export const logoutUserFailure = createAction(
    '[App API] Logout User Fail'
);

export const getTestSuccess = createAction(
    '[App API] Get Test Success',
    props<{ test: string }>()
);

export const getTestFailure = createAction(
    '[App API] Get Test Fail',
    props<{ error: string }>()
);
