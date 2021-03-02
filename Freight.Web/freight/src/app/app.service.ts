import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { BusinessEntity } from './_shared/model/business-entity';
import { BusinessAccess } from './_shared/model/business-access';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { User } from './_shared/model/user';
import { Business } from './_shared/model/business';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  private apiURL = environment.webapiURL;
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
    ],
    status: [
      // 'Sent',
      // 'Received',
      // 'Shipped',
      // 'Pending'
      // 'Open',
      // 'Closed',
      // 'Cancelled'
      'Carrier Drop Off',
      'Carrier Pick Up'
    ]
  }
  public shippingCarriers = [
    {
      id: 1,
      name: 'UPS'
    }
  ];
  public shippingServices = [
    {
      id: 1,
      name: 'Ground'
    }
  ];
  public shippingCarriersMap =
    {
      1: 'UPS'
    }
  public shippingServicesMap =
    {
      1: 'Ground'
    }

  constructor(
    protected http: HttpClient,
    protected router: Router) { }

  getBusinessEntities(): Observable<BusinessEntity[]> {
    const test = [
      {
        id: 1,
        name: 'company one'
      },
      {
        id: 2,
        name: 'company two'
      },
      {
        id: 3,
        name: 'company three'
      },
      {
        id: 4,
        name: 'company four'
      },
      {
        id: 5,
        name: 'company five'
      },
    ];
    return of(test);
  }

  getBusinessAccesses(id: number): Observable<BusinessAccess> {
    const test = [{
      id: 1,
      headers: [1, 6]
    },
    {
      id: 2,
      headers: [1, 2, 6]
    },
    {
      id: 3,
      headers: [1, 2, 3, 6]
    },
    {
      id: 4,
      headers: [1, 2, 3, 4, 6]
    },
    {
      id: 5,
      headers: [1, 2, 3, 5, 6]
    },
    ];
    const result = new BusinessAccess(test.find(x => x.id === id).headers);
    console.log(result);
    return of(result);
  }

  getTest(token: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    });
    return this.http.get<any>('https://webapi.fbasimplify.com/identity', { headers })
      .pipe(
        tap(data => console.log('TEST DATA: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  getUser(userid: string): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + token
    });
    return this.http.get<any>(`${this.apiURL}/user/${userid}`, { headers })
      .pipe(
        tap((data: User) => { }),
        catchError(this.handleError)
      );
  }
  createBusiness(body: Business): Observable<any> {
    return this.http.post<any>(this.apiURL + '/business', body)
      .pipe(
        catchError(this.handleError)
      );
  }
  getBusiness(businessid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/business/' + businessid)
      .pipe(
        catchError(this.handleError)
      );
  }
  getBusinessList(userid): Observable<any> {
    return this.http.get<any>(this.apiURL + `/business/businessuser/user/${userid}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  updateUser(body: User): Observable<any> {
    return this.http.put<any>(this.apiURL + '/user', body)
      .pipe(
        catchError(this.handleError)
      );
  }
  public handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err?.body?.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
