import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromItem from '../state';
import * as fromApp from 'app/_state';
import { ItemPageActions } from '../state/actions';
import { Observable, Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'app/_shared/model/item';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'item-shell',
  templateUrl: './item-shell.component.html',
  styleUrls: ['./item-shell.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ItemShellComponent implements OnDestroy {
  itemEntities$: Observable<Item[]>;
  selectedItem$: Observable<Item>;
  isLoading$: Observable<boolean>;

  private _unsubscribeAll: Subject<any>;

  constructor(
    public _matDialog: MatDialog,
    private store: Store<fromItem.State>,
    private appStore: Store<fromApp.State>,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.itemEntities$ = this.store.select(fromItem.getAllItemList);
    this.selectedItem$ = this.store.select(fromItem.getSelectedItem);
    this.isLoading$ = this.store.select(fromItem.getIsLoading);
    this.appStore.select(fromApp.getCurrentBusinessEntityId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(businessid => {
        this.store.dispatch(ItemPageActions.loadItemList({ businessid }));
      });
    //this.store.dispatch(ItemPageActions.loadAllItemList());

  }
  selectItem(item: Item): void {
    this.store.dispatch(ItemPageActions.setCurrentItem({ currentItem: item }));
  }
  deleteItem(itemid: Item): void {
    this.store.dispatch(ItemPageActions.deleteItem({ itemid }));
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }
}
