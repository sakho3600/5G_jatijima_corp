import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ApiResponse } from '@models/api-response';
import { environment } from '@env/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConversationsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(environment.api_routes.discussions_list)
    .pipe(
        tap(res => console.log('Fetched conversations', res)),
        catchError(this.handleError)
    );
  }

  getMessages(discussionId, messagesNumber): Observable<ApiResponse> {
    const params = new HttpParams().set('discussionId', discussionId).set('messagesNumber', messagesNumber);
    const options = environment.production ? {params} : {};

    return this.http.get<ApiResponse>(environment.api_routes.discussions_get_messages, options)
    .pipe(
        tap(res => console.log('Fetched messages', res)),
        catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
        'Something bad happened; please try again later.');
  }
}
