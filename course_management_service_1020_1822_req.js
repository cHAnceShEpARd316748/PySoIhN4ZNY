// 代码生成时间: 2025-10-20 18:22:50
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseManagementService {

  private baseUrl = 'https://api.example.com/courses'; // Base URL for course API

  constructor(private http: HttpClient) { }

  /**
   * Retrieves all courses from the server.
   * @returns Observable of course data array.
   */
  getCourses(): Observable<any> {
    return this.http.get(this.baseUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  /**
   * Retrieves a course by its ID.
   * @param courseId The ID of the course to retrieve.
   * @returns Observable of the course data.
   */
  getCourseById(courseId: string): Observable<any> {
    const url = `${this.baseUrl}/${courseId}`;
    return this.http.get(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Creates a new course on the server.
   * @param courseData The course data to create.
   * @returns Observable of the created course data.
   */
  createCourse(courseData: any): Observable<any> {
    return this.http.post(this.baseUrl, courseData)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Updates an existing course on the server.
   * @param courseId The ID of the course to update.
   * @param courseData The data to update.
   * @returns Observable of the updated course data.
   */
  updateCourse(courseId: string, courseData: any): Observable<any> {
    const url = `${this.baseUrl}/${courseId}`;
    return this.http.put(url, courseData)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Deletes a course from the server.
   * @param courseId The ID of the course to delete.
   * @returns Observable of the deletion result.
   */
  deleteCourse(courseId: string): Observable<any> {
    const url = `${this.baseUrl}/${courseId}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Handles any errors that occur during HTTP requests.
   * @param error The error to handle.
   * @returns Observable that throws the error.
   */
  private handleError(error: any) {
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
