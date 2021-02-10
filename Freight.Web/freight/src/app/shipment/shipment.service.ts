import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError, Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { catchError, tap, takeUntil } from "rxjs/operators";
//import { Item } from "./component/edit-shipment/node_modules/app/_shared/model/item";
import { Shipment } from "../_shared/model/shipment";
@Injectable()
export class ShipmentService implements OnDestroy {
  private apiURL = environment.webapiURL;
  private _unsubscribeAll: Subject<any>;
  onShipmentSelected: BehaviorSubject<any>;
  allShipments: BehaviorSubject<any>;
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
  constructor(private http: HttpClient) {
    this.onShipmentSelected = new BehaviorSubject({});
    this.allShipments = new BehaviorSubject([]);
    this.isEdit = new BehaviorSubject({});
    this.searchTerm = new BehaviorSubject("");
    this._unsubscribeAll = new Subject();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  getAllShipmentsList(): Observable<any> {
    return this.http.get(this.apiURL + '/shipment')
      .pipe(
        tap((data: any) => {
          this.allShipments.next(data);
        }),
        catchError(this.handleError)
      );
  }

  getShipment(id: string): Observable<any> {
    return this.http.get<any>(this.apiURL + '/shipment/' + id)
      .pipe(
        tap((data: Shipment) => {
          this.onShipmentSelected.next(data);
        }),
        catchError(this.handleError)
      );
  }

  updateShipment(body: Shipment): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + token
    });
    return this.http.put<any>(this.apiURL + '/shipment', body, { headers })
      .pipe(
        tap((data: Shipment) => {
          this.onShipmentSelected.next(data);
        }),
        catchError(this.handleError)
      );
  }

  createShipment(body: Shipment): Observable<any> {
    return this.http.post<any>(this.apiURL + '/shipment', body)
      .pipe(
        tap((data: Shipment) => {
          this.onShipmentSelected.next(data);
        }),
        catchError(this.handleError)
      );
  }

  deleteShipment(id: string): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/shipment/' + id)
      .pipe(
        tap((data: Shipment) => {
          this.onShipmentSelected.next(data);
        }),
        catchError(this.handleError)
      );
  }
  deleteShipmentPackage(id: string): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/shipment/package/' + id)
      .pipe(
        tap((data: Shipment) => {
          this.onShipmentSelected.next(data);
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
