import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError, Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { catchError, tap, takeUntil } from "rxjs/operators";
import { Location } from "app/_shared/model/location";
@Injectable()
export class LocationService implements OnDestroy {
  private apiURL = environment.webapiURL;
  private _unsubscribeAll: Subject<any>;
  onLocationSelected: BehaviorSubject<any>;
  allLocations: BehaviorSubject<Location[]>;
  isEdit: BehaviorSubject<any>;
  filteredCourses: any[];
  currentCategory: string;
  searchTerm: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.onLocationSelected = new BehaviorSubject({});
    this.allLocations = new BehaviorSubject([]);
    this.isEdit = new BehaviorSubject({});
    this.searchTerm = new BehaviorSubject("");
    this._unsubscribeAll = new Subject();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getAllLocationList(): Observable<any> {
    return this.http.get(this.apiURL + "/location")
      .pipe(
        tap((data: Location[]) => {
          this.allLocations.next(data);
        }),
        catchError(this.handleError)
      );
  }

  getLocationList(businessid): Observable<any> {
    return this.http
      .get(this.apiURL + `/location/business/${businessid}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getLocation(id: string): Observable<any> {
    return this.http.get<any>(this.apiURL + '/location/' + id)
      .pipe(
        tap((data: Location) => {
          this.onLocationSelected.next(data);
        }),
        catchError(this.handleError)
      );
  }

  updateLocation(body: Location): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + token
    });
    return this.http.put<any>(this.apiURL + '/location', body, { headers })
      .pipe(
        tap((data: Location) => {
          this.onLocationSelected.next(data);
        }),
        catchError(this.handleError)
      );
  }

  createLocation(body: Location): Observable<any> {
    return this.http.post<any>(this.apiURL + '/location', body)
      .pipe(
        tap((data: Location) => {
          this.onLocationSelected.next(data);
        }),
        catchError(this.handleError)
      );
  }
  deleteLocation(locationid: any): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/location/' + locationid)
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
