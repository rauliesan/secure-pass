import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordResponse } from '../models/password-response-interface';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  
  private url = 'http://localhost/password/evaluate';

  constructor(private http: HttpClient) { }

  evaluate(password: string): Observable<PasswordResponse> {
    return this.http.post<PasswordResponse>(this.url, {password});
  }

}
