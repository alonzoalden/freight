import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError, Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { catchError, tap, takeUntil } from "rxjs/operators";
import { Business } from "app/_shared/model/business";
@Injectable()
export class BusinessService implements OnDestroy {
  private apiURL = environment.webapiURL;
  private _unsubscribeAll: Subject<any>;
  onBusinessSelected: BehaviorSubject<any>;
  allBusinesss: BehaviorSubject<Business[]>;
  isEdit: BehaviorSubject<any>;
  filteredCourses: any[];
  currentCategory: string;
  searchTerm: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.onBusinessSelected = new BehaviorSubject({});
    this.allBusinesss = new BehaviorSubject([]);
    this.isEdit = new BehaviorSubject({});
    this.searchTerm = new BehaviorSubject("");
    this._unsubscribeAll = new Subject();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  getAllBusinessList(): Observable<any> {
    return this.http.get(this.apiURL + `/business`)
      .pipe(
        tap((data: Business[]) => {
          this.allBusinesss.next(data);
        }),
        catchError(this.handleError)
      );
  }

  getBusinessList(userid: string): Observable<any> {
    return this.http.get<any>(this.apiURL + `/business/businessuser/user/${userid}`)
      .pipe(
        tap((data: Business) => {
          console.log(data);
          this.onBusinessSelected.next(data);
        }),
        catchError(this.handleError)
      );
  }

  updateBusiness(body: Business): Observable<any> {
    return this.http.put<any>(this.apiURL + '/business', body)
      .pipe(
        tap((data: Business) => {
          this.onBusinessSelected.next(data);
        }),
        catchError(this.handleError)
      );
  }

  createBusiness(body: Business): Observable<any> {
    return this.http.post<any>(this.apiURL + '/business', body)
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteBusiness(businessid: any): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/business/' + businessid)
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
