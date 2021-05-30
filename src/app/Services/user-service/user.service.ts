import { Injectable } from '@angular/core';
import { User } from './../../Models/user.model'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL = "http://localhost:8080/api/users/";
  //apiURL = "https://colval-network.herokuapp.com/api/users/"
  header = new HttpHeaders({'Content-Type' : 'application/json; charset=utf-8'});

  constructor(private http: HttpClient) { }


  createUser(user: User) : Observable<User> {
    return this.http.post<User>(this.apiURL + "createUser", user, {headers : this.header}).pipe(retry(1),
    catchError(this.handleError)
    );
  }

  getUserByUsername(username: String) : Observable<User> {
    return this.http.get<User>(this.apiURL + "getByUsername?username=" + username).pipe(retry(1),
    catchError(this.handleError));
  }


  handleError(error: HttpErrorResponse) {
    if (error.status != 200)
      return throwError(error);
  }
}
