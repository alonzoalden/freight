import { createAction, props } from '@ngrx/store';

import { BusinessAccess } from '../../../_shared/model/business-access';

export const loadBusinessAccessSuccess = createAction(
  '[Dashboard API] Load Business Accesses Success',
  props<{ access: BusinessAccess }>()
);

export const loadBusinessAccessFailure = createAction(
  '[Dashboard API] Load Business Accesses Fail',
  props<{ error: string }>()
);
