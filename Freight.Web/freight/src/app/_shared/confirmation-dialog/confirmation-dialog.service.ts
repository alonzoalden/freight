import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class ConfirmationDialogService {
    private apiURL = environment.webapiURL;
    constructor(
        private _httpClient: HttpClient
    ) { }
    checkManagerCode(code: string): Observable<any> {
        return this._httpClient.get<any>(this.apiURL + `/member/managercode/${code}`)
            .pipe(
                catchError(this.handleError)
            );
    }
    private handleError = (err: HttpErrorResponse) => {
        let errorMessage: string;
        if (err.error) {
            errorMessage = `${err.error.Message}`;
        } else {
            errorMessage = `Response error: ${err.error.Message}`;
        }
        return throwError(errorMessage);
    }
}
