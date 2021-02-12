import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { BusinessEntity } from '../_shared/model/business-entity';
import { BusinessAccess } from '../_shared/model/business-access';
import { environment } from "../../environments/environment";
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
  private apiURL = environment.webapiURL;
  constructor(
    protected http: HttpClient,
    protected router: Router) { }

  getBusinessAccess(id: number): Observable<BusinessAccess> {
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
    //const result = new BusinessAccess(test.find(x => x.id === id).headers);
    return of(null);
  }

  getDashboardInfo(businessid): Observable<any> {
    return this.http.get<any>(this.apiURL + `/business/${businessid}/dashboard` )
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

