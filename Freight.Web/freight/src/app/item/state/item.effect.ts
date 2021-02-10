import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationsService } from 'angular2-notifications';

import { of } from 'rxjs';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';

import { ItemService } from '../item.service';
import { ItemPageActions, ItemApiActions } from './actions';

@Injectable()
export class ItemEffects {

  constructor(private actions$: Actions, private itemService: ItemService, private notifyService: NotificationsService) { }

  loadAllItemList$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ItemPageActions.loadAllItemList),
        concatMap(action => this.itemService.getAllItemList()
          .pipe(
            map(items => ItemApiActions.loadItemsListSuccess({ items })),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ItemApiActions.loadItemsListFailure({ error }))
            })
          )
        )
      );
  });

  loadItemList$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ItemPageActions.loadItemList),
        concatMap(action => this.itemService.getItemList(action.businessid)
          .pipe(
            map(items => ItemApiActions.loadItemsListSuccess({ items })),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ItemApiActions.loadItemsListFailure({ error }))
            })
          )
        )
      );
  });

  updateItem$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ItemPageActions.updateItem),
        concatMap(action => this.itemService.updateItem(action.item)
          .pipe(
            map((item) => {
              this.notifyService.success('Success', `${item.itemNumber} has been updated.`, { timeOut:3500, clickToClose: true });
              return ItemApiActions.updateItemSuccess({ item });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ItemApiActions.updateItemFailure({ error }))
            })
          )
        )
      );
  });
  createItem$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ItemPageActions.createItem),
        concatMap(action => this.itemService.createItem(action.item)
          .pipe(
            map((item) => {
              this.notifyService.success('Success', `${item.itemName} has been updated.`, { timeOut:3500, clickToClose: true });
              return ItemApiActions.createItemSuccess({ item });
            }),
            catchError(error => {
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ItemApiActions.createItemFailure({ error }))
            })
          )
        )
      );
  });

  deleteItem$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ItemPageActions.deleteItem),
        concatMap(action => this.itemService.deleteItem(action.itemid)
          .pipe(
            map((item) => {
              this.notifyService.success('Success', `Item has been removed.`, { timeOut:3500, clickToClose: true });
              return ItemApiActions.deleteItemSuccess({ itemid: action.itemid });
            }),
            catchError(error => {
              console.log(error)
              this.notifyService.error('Error', `${error}`, { clickToClose: true });
              return of(ItemApiActions.deleteItemFailure({ error }))
            })
          )
        )
      );
  });
}
