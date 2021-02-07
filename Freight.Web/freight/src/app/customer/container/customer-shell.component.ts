import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCustomer from '../state';
import { CustomerPageActions } from '../state/actions';
import { Observable, Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from 'app/_shared/model/customer';


@Component({
  selector: 'customer-shell',
  templateUrl: './customer-shell.component.html',
  styleUrls: ['./customer-shell.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CustomerShellComponent implements OnDestroy {
  customerEntities$: Observable<Customer[]>;
  selectedCustomer$: Observable<Customer>;
  isLoading$: Observable<boolean>;

  private _unsubscribeAll: Subject<any>;

  constructor(
    public _matDialog: MatDialog,
    private store: Store<fromCustomer.State>
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.customerEntities$ = this.store.select(fromCustomer.getAllcustomerList);
    this.selectedCustomer$ = this.store.select(fromCustomer.getSelectedcustomer);
    this.isLoading$ = this.store.select(fromCustomer.getIsLoading);
    this.store.dispatch(CustomerPageActions.loadCustomerList());
  }
  selectCustomer(customer: Customer): void {
    this.store.dispatch(CustomerPageActions.setCurrentCustomer({ currentCustomer: customer }));
  }
  deleteCustomer(customerid: any): void {
    this.store.dispatch(CustomerPageActions.deleteCustomer({ customerid }));
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }
}