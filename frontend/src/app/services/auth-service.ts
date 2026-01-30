import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/user-response-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private url = 'http://localhost:9999/user';

  constructor(private http: HttpClient) { }

  login(user: string, password: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.url+"/login?email="+user+"&password="+password);
  }

  register(user: string, password: string): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.url+"/register", {user, password});
  }

  contador(id: number): Observable<UserResponse>{
    return this.http.get<UserResponse>(`${this.url}/${id}`);
  }
}
