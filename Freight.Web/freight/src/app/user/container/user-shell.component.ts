import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromUser from '../state';
import { UserPageActions } from '../state/actions';
import { Observable, Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'app/_shared/model/user';


@Component({
  selector: 'user-shell',
  templateUrl: './user-shell.component.html',
  styleUrls: ['./user-shell.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class UserShellComponent implements OnDestroy {
  userEntities$: Observable<User[]>;
  selectedUser$: Observable<User>;
  isLoading$: Observable<boolean>;

  private _unsubscribeAll: Subject<any>;

  constructor(
    public _matDialog: MatDialog,
    private store: Store<fromUser.State>
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.userEntities$ = this.store.select(fromUser.getAlluserList);
    this.selectedUser$ = this.store.select(fromUser.getSelecteduser);
    this.isLoading$ = this.store.select(fromUser.getIsLoading);
    this.store.dispatch(UserPageActions.loadUserList());
  }
  selectUser(user: User): void {
    this.store.dispatch(UserPageActions.setCurrentUser({ currentUser: user }));
  }
  deleteUser(userid: any): void {
    this.store.dispatch(UserPageActions.deleteUser({ userid }));
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }
}
