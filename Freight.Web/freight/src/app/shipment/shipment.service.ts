import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError, Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { catchError, tap, takeUntil } from "rxjs/operators";
//import { Item } from "./component/edit-shipment/node_modules/app/_shared/model/item";
import { Shipment, ShipmentContact, ShipmentDetail, ShipmentFee, ShipmentLine, ShipmentPackage } from "../_shared/model/shipment";
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
        catchError(this.handleError)
      );
  }
  getShipmentList(businessid): Observable<any> {
    return this.http
      .get(this.apiURL + `/shipment/business/${businessid}`)
      .pipe(
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

  createShipment(body: any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/shipment', body)
      .pipe(
        catchError(this.handleError)
      );
  }

  createShipmentPackage(body: ShipmentPackage): Observable<any> {
    return this.http.post<any>(this.apiURL + '/shipment/shipmentpackage', body)
      .pipe(
        catchError(this.handleError)
      );
  }
  editShipmentPackage(body: ShipmentPackage): Observable<any> {
    return this.http.put<any>(this.apiURL + '/shipment/shipmentpackage', body)
      .pipe(
        catchError(this.handleError)
      );
  }


  createShipmentLine(body: ShipmentLine): Observable<any> {
    return this.http.post<any>(this.apiURL + '/shipment/shipmentline', body)
      .pipe(
        catchError(this.handleError)
      );
  }
  editShipmentLine(body: ShipmentLine): Observable<any> {
    return this.http.put<any>(this.apiURL + '/shipment/shipmentline', body)
      .pipe(
        catchError(this.handleError)
      );
  }

  createShipmentFee(body: ShipmentFee): Observable<any> {
    return this.http.post<any>(this.apiURL + '/shipment/shipmentfee', body)
      .pipe(
        catchError(this.handleError)
      );
  }
  editShipmentFee(body: ShipmentFee): Observable<any> {
    return this.http.put<any>(this.apiURL + '/shipment/shipmentfee', body)
      .pipe(
        catchError(this.handleError)
      );
  }
  createShipmentContact(body: ShipmentContact): Observable<any> {
    return this.http.post<any>(this.apiURL + '/shipment/shipmentcontact', body)
      .pipe(
        catchError(this.handleError)
      );
  }
  editShipmentContact(body: ShipmentContact): Observable<any> {
    return this.http.put<any>(this.apiURL + '/shipment/shipmentcontact', body)
      .pipe(
        catchError(this.handleError)
      );
  }
  createShipmentComment(body: ShipmentLine): Observable<any> {
    return this.http.post<any>(this.apiURL + '/shipment/shipmentcomment', body)
      .pipe(
        catchError(this.handleError)
      );
  }
  editShipmentComment(body: any): Observable<any> {
    return this.http.put<any>(this.apiURL + '/shipment/shipmentcomment', body)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteShipment(id: string): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/shipment/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteShipmentLine(id: string): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/shipment/shipmentline/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteShipmentPackage(id: string): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/shipment/shipmentpackage/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteShipmentFee(id: string): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/shipment/shipmentfee/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteShipmentContact(id: string): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/shipment/shipmentcontact/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteShipmentComment(id: string): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/shipment/shipmentcomment/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  getItemList(businessid): Observable<any> {
    return this.http
      .get(this.apiURL + `/item/business/${businessid}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  getFeeList(businessid): Observable<any> {
    return this.http
      .get(this.apiURL + `/fee/business/${businessid}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  getContactList(customerid): Observable<any> {
    return this.http
      .get(this.apiURL + `/contact/customer/${customerid}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  getFFWList(): Observable<any> {
    return this.http
      .get(this.apiURL + `/business/ffw`)
      .pipe(
        catchError(this.handleError)
      );
  }
  get3plList(): Observable<any> {
    return this.http
      .get(this.apiURL + `/business/3pl`)
      .pipe(
        catchError(this.handleError)
      );
  }
  getShipperList(): Observable<any> {
    return this.http
      .get(this.apiURL + `/business/shipper`)
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
  getLocationsList(businessid): Observable<any> {
    return this.http
      .get(this.apiURL + `/location/business/${businessid}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  getShipmentLineList(shipmentid): Observable<any> {
    return this.http
      .get(this.apiURL + `/shipment/${shipmentid}/shipmentline`)
      .pipe(
        catchError(this.handleError)
      );
  }
  getShipmentPackageList(shipmentid): Observable<any> {
    return this.http
      .get(this.apiURL + `/shipment/${shipmentid}/shipmentpackage`)
      .pipe(
        catchError(this.handleError)
      );
  }
  getShipmentFeeList(shipmentid): Observable<any> {
    return this.http
      .get(this.apiURL + `/shipment/${shipmentid}/shipmentfee`)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  getShipmentContactList(shipmentid): Observable<any> {
    return this.http
      .get(this.apiURL + `/shipment/${shipmentid}/shipmentcontact`)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  getShipmentCommentList(shipmentid): Observable<any> {
    return this.http
      .get(this.apiURL + `/shipment/${shipmentid}/shipmentcomment`)
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
