import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BusinessEntity } from '../_shared/model/business-entity';
import { BusinessAccess } from '../_shared/model/business-access';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
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
    const result = new BusinessAccess(test.find(x => x.id === id).headers);
    return of(result);
  }
}
