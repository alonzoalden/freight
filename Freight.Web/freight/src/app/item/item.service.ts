import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError, Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { catchError, tap, takeUntil } from "rxjs/operators";
import { Item } from "app/_shared/model/item";
import { OidcSecurityService } from "angular-auth-oidc-client";
@Injectable()
export class ItemService implements OnDestroy {
  private apiURL = environment.webapiURL;
  private _unsubscribeAll: Subject<any>;
  onItemSelected: BehaviorSubject<any>;
  allItems: BehaviorSubject<Item[]>;
  isEdit: BehaviorSubject<any>;
  filteredCourses: any[];
  currentCategory: string;
  searchTerm: BehaviorSubject<any>;
  public dropDownTypes = {
    units: [
      'IN',
      'CM'
    ],
    weights: [
      'lb',
      'kg'
    ],
    currency: [
      'USD'
    ]
  }
  constructor(private http: HttpClient,public oidcSecurityService: OidcSecurityService) {
    this.onItemSelected = new BehaviorSubject({});
    this.allItems = new BehaviorSubject([]);
    this.isEdit = new BehaviorSubject({});
    this.searchTerm = new BehaviorSubject("");
    this._unsubscribeAll = new Subject();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  getAllItemList(): Observable<any> {
    return this.http
      .get(this.apiURL + "/item")
      .pipe(
        tap((data: Item[]) => {
          this.allItems.next(data);
        }),
        catchError(this.handleError)
      );
  }

  getItem(id: string): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.oidcSecurityService.getToken()
    });
    //return this.http.get<any>('https://localhost:44357/identity', { headers })


    return this.http.get<any>(this.apiURL + '/item/' + id, { headers } )
      .pipe(
        tap((data: Item) => {
          this.onItemSelected.next(data);
        }),
        catchError(this.handleError)
      );
  }

  getCurrentUserTest(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/user/current' )
      .pipe(
        tap((data: Item) => {
          this.onItemSelected.next(data);
        }),
        catchError(this.handleError)
      );
  }

  updateItem(body: Item): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + token
    });
    return this.http.put<any>(this.apiURL + '/item', body, { headers })
      .pipe(
        tap((data: Item) => {
          this.onItemSelected.next(data);
        }),
        catchError(this.handleError)
      );
  }

  createItem(body: Item): Observable<any> {
    return this.http.post<any>(this.apiURL + '/item', body)
      .pipe(
        tap((data: Item) => {
          this.onItemSelected.next(data);
        }),
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
