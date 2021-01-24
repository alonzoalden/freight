import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError, Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { catchError, tap, takeUntil } from "rxjs/operators";
import { User } from "app/_shared/model/user";

@Injectable()
export class ItemService implements OnDestroy {
  private apiURL = environment.webapiURL;
  private _unsubscribeAll: Subject<any>;
  onItemSelected: BehaviorSubject<any>;
  allItemList: BehaviorSubject<any>;
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
      'LB',
      'KG'
    ]
  }
  constructor(private http: HttpClient) {
    this.onItemSelected = new BehaviorSubject({});
    this.allItemList = new BehaviorSubject([]);
    this.isEdit = new BehaviorSubject({});
    this.searchTerm = new BehaviorSubject("");
    this._unsubscribeAll = new Subject();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  loadAllItemList(): any {
    if (this.allItemList.value.length) {
      return;
    }
    this.http
      .get<any>(this.apiURL + "/item/allitemlist")
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this.allItemList.next(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getAllItemList(): Observable<any> {
    if (this.allItemList.value.length) {
      return this.allItemList;
    }
    return this.http
      .get<any>(this.apiURL + "/item/allitemlist")
      .pipe(
        tap((data) => {
          this.allItemList.next(data);
        }),
        catchError(this.handleError)
      );
  }

  getItemDimension(id: string): Observable<any> {
    return this.http.get<any>(this.apiURL + "/item/" + id).pipe(
      tap((data) => {
        this.onItemSelected.value.Data = data;
        this.onItemSelected.next(this.onItemSelected.value);
      }),
      catchError(this.handleError)
    );
  }

  // getUser(userid: string): Observable<string> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: 'Bearer ' + token
  //   });
  //   return this.http.get<any>(`https://webapi.fbasimplify.com/user/${userid}`, { headers })
  //     .pipe(
  //       tap((data: User) => console.log('TEST DATA: ' + JSON.stringify(data)))()),
  //       catchError(this.handleError)
  //     );
  // }

  editItemDimension(itemdimension: any): Observable<any> {
    return this.http
      .put<any>(
        this.apiURL + "/item/" + itemdimension.ItemID,
        itemdimension
      )
      .pipe(catchError(this.handleError));
  }

  resyncInventoryDetail(itemId: string): Observable<any> {
    return this.http
      .put<any>(this.apiURL + `/Item/${itemId}/resync`, {})
      .pipe(catchError(this.handleError));
  }
  editSpecialInstruction(id: any, item: any): Observable<any> {
    return this.http
      .put<any>(
        this.apiURL + `/item/${id}/specialinstruction`,
        item
      )
      .pipe(catchError(this.handleError));
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
