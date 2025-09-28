// 代码生成时间: 2025-09-29 01:39:19
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DbVersionControlService {
  private apiUrl = '/api/db/version';

  constructor(private http: HttpClient) {}

  /**
   * Fetches the current database version.
   *
   * @returns An Observable of the database version.
   */
  public getCurrentDbVersion(): Observable<any> {
    return this.http.get(this.apiUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  /**
   * Updates the database version.
   *
   * @param newVersion The new version to update to.
   * @returns An Observable of the update result.
   */
  public updateDbVersion(newVersion: string): Observable<any> {
    return this.http.post(this.apiUrl, { version: newVersion })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  /**
   * Handles errors by logging and returning a user-friendly error.
   *
   * @param error The error to handle.
   * @returns An Observable of the error.
   */
  private handleError(error: any) {
    console.error('An error occurred:', error); // Log to console for debugging.
    return throwError('Something bad happened; please try again later.');
  }
}
