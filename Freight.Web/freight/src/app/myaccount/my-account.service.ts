import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MyAccountService {
  constructor(
    protected http: HttpClient,
    protected router: Router) { }

}
