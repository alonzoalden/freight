import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';

import { ItemService } from '../item.service';
import { ItemPageActions, ItemApiActions } from './actions';

@Injectable()
export class ItemEffects {

  constructor(private actions$: Actions, private itemService: ItemService) { }

  loadItemList$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ItemPageActions.loadItemList),
        concatMap(action => this.itemService.getAllItemList()
          .pipe(
            map(items => ItemApiActions.loadItemsListSuccess({ items })),
            catchError(error => of(ItemApiActions.loadItemsListFailure({ error })))
          )
        )
      );
  });
}
