import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Post } from '../Models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  //apiURL = "http://localhost:8080/api/post/";
  apiURL = "https://colval-network.herokuapp.com/api/post/"
  header = new HttpHeaders({'Content-Type' : 'application/json; charset=utf-8'});

  constructor(private http: HttpClient) { }


  createPost(post: Post) : Observable<Post> {
    return this.http.post<Post>(this.apiURL + "createPost", post, {headers : this.header}).pipe(retry(1),
    catchError(this.handleError)
    );
  }

  getAllPost() : Observable<Post[]> {
    return this.http.get<Post[]>(this.apiURL + "getAll", {headers : this.header}).pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.status != 200)
      return throwError(error);
  }
}
