import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError, Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { catchError, tap, takeUntil } from "rxjs/operators";
import { User } from "app/_shared/model/user";
@Injectable()
export class UserService implements OnDestroy {
  private apiURL = environment.webapiURL;
  private _unsubscribeAll: Subject<any>;
  onUserSelected: BehaviorSubject<any>;
  allUsers: BehaviorSubject<User[]>;
  isEdit: BehaviorSubject<any>;
  filteredCourses: any[];
  currentCategory: string;
  searchTerm: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.onUserSelected = new BehaviorSubject({});
    this.allUsers = new BehaviorSubject([]);
    this.isEdit = new BehaviorSubject({});
    this.searchTerm = new BehaviorSubject("");
    this._unsubscribeAll = new Subject();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  getAllUserList(): Observable<any> {
    return this.http.get(this.apiURL + "/user")
      .pipe(
        catchError(this.handleError)
      );
  }

  getUser(id: string): Observable<any> {
    return this.http.get<any>(this.apiURL + '/user/' + id)
      .pipe(
        tap((data: User) => {
          this.onUserSelected.next(data);
        }),
        catchError(this.handleError)
      );
  }

  updateUser(body: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + token
    });
    return this.http.put<any>(this.apiURL + '/user', body, { headers })
      .pipe(
        tap((data: User) => {
          this.onUserSelected.next(data);
        }),
        catchError(this.handleError)
      );
  }

  createUser(body: User): Observable<any> {
    return this.http.post<any>(this.apiURL + '/user', body)
      .pipe(
        tap((data: User) => {
          this.onUserSelected.next(data);
        }),
        catchError(this.handleError)
      );
  }

  deleteUser(userid: any): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/user/' + userid)
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