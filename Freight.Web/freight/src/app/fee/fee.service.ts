import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError, Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { catchError, tap, takeUntil } from "rxjs/operators";
import { Fee } from "app/_shared/model/fee";
@Injectable()
export class FeeService implements OnDestroy {
  private apiURL = environment.webapiURL;
  private _unsubscribeAll: Subject<any>;
  onFeeSelected: BehaviorSubject<any>;
  allFees: BehaviorSubject<Fee[]>;
  isEdit: BehaviorSubject<any>;
  filteredCourses: any[];
  currentCategory: string;
  searchTerm: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.onFeeSelected = new BehaviorSubject({});
    this.allFees = new BehaviorSubject([]);
    this.isEdit = new BehaviorSubject({});
    this.searchTerm = new BehaviorSubject("");
    this._unsubscribeAll = new Subject();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  getAllFeeList(): Observable<any> {
    return this.http.get(this.apiURL + "/fee")
      .pipe(
        tap((data: Fee[]) => {
          this.allFees.next(data);
        }),
        catchError(this.handleError)
      );
  }

  getFee(id: string): Observable<any> {
    return this.http.get<any>(this.apiURL + '/fee/' + id)
      .pipe(
        tap((data: Fee) => {
          this.onFeeSelected.next(data);
        }),
        catchError(this.handleError)
      );
  }

  updateFee(body: Fee): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + token
    });
    return this.http.put<any>(this.apiURL + '/fee', body, { headers })
      .pipe(
        tap((data: Fee) => {
          this.onFeeSelected.next(data);
        }),
        catchError(this.handleError)
      );
  }

  createFee(body: Fee): Observable<any> {
    return this.http.post<any>(this.apiURL + '/fee', body)
      .pipe(
        tap((data: Fee) => {
          this.onFeeSelected.next(data);
        }),
        catchError(this.handleError)
      );
  }

  deleteFee(feeid: any): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/fee/' + feeid)
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
