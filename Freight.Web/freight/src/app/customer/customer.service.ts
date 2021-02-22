import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError, Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { catchError, tap, takeUntil } from "rxjs/operators";
import { Contact, Customer } from "app/_shared/model/customer";
@Injectable()
export class CustomerService implements OnDestroy {
  private apiURL = environment.webapiURL;
  private _unsubscribeAll: Subject<any>;
  onCustomerSelected: BehaviorSubject<any>;
  allCustomers: BehaviorSubject<Customer[]>;
  isEdit: BehaviorSubject<any>;
  filteredCourses: any[];
  currentCategory: string;
  searchTerm: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.onCustomerSelected = new BehaviorSubject({});
    this.allCustomers = new BehaviorSubject([]);
    this.isEdit = new BehaviorSubject({});
    this.searchTerm = new BehaviorSubject("");
    this._unsubscribeAll = new Subject();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  getAllCustomerList(): Observable<any> {
    return this.http.get(this.apiURL + "/customer")
      .pipe(
        catchError(this.handleError)
      );
  }
  getCustomerList(businessid): Observable<any> {
    return this.http
      .get(this.apiURL + `/customer/business/${businessid}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  getCustomer(id: string): Observable<any> {
    return this.http.get<any>(this.apiURL + '/customer/' + id)
      .pipe(
        tap((data: Customer) => {
          this.onCustomerSelected.next(data);
        }),
        catchError(this.handleError)
      );
  }

  updateCustomer(body: Customer): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + token
    });
    return this.http.put<any>(this.apiURL + '/customer', body, { headers })
      .pipe(
        tap((data: Customer) => {
          this.onCustomerSelected.next(data);
        }),
        catchError(this.handleError)
      );
  }

  createCustomer(body: Customer): Observable<any> {
    return this.http.post<any>(this.apiURL + '/customer', body)
      .pipe(
        tap((data: Customer) => {
          this.onCustomerSelected.next(data);
        }),
        catchError(this.handleError)
      );
  }
  getContactList(customerid: any): Observable<any> {
    return this.http
      .get(this.apiURL + `/contact/customer/${customerid}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  createContact(body: Contact): Observable<any> {
    return this.http.post<any>(this.apiURL + '/contact', body)
      .pipe(
        catchError(this.handleError)
      );
  }
  getContact(id: any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/contact/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteContact(id: any): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/contact/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }
  updateContact(body: Contact): Observable<any> {
    return this.http.put<any>(this.apiURL + '/contact', body)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteCustomer(customerid: any): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/customer/' + customerid)
      .pipe(
        catchError(this.handleError)
      );
  }
  verifyUserEmail(email: any): Observable<any> {
    return this.http.get<any>(this.apiURL + `/user/email/${email}` )
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError = (err: HttpErrorResponse) => {
    let errorMessage: string;
    if (err.error instanceof Error) {
      errorMessage = `Network error: ${err.message}`;
    } else {
      errorMessage = `Response error: ${err.message}`;
    }
    return throwError(errorMessage);
  };
}
