// 代码生成时间: 2025-10-21 08:41:26
import { Component } from '@angular/core';
import { IncidentService } from './incident.service';  // Import the service that will manage the incidents
import { Incident } from './models/incident';  // Import the Incident model
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-incident-response',
  templateUrl: './incident-response.component.html',
  styleUrls: ['./incident-response.component.css']
})
export class IncidentResponseAppComponent {
  // Define a FormGroup to hold the form data
  incidentForm: FormGroup;
  submitted = false;
  incident: Incident;
  error: string = null;

  // Inject the FormBuilder to create the form, and the IncidentService to manage incidents
  constructor(private formBuilder: FormBuilder, private incidentService: IncidentService) {
    this.createForm();
  }

  // Create the form with validators
  private createForm(): void {
    this.incidentForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      severity: ['', Validators.required]
    });
  }

  // Getter for easy access to form fields
  get f() { return this.incidentForm.controls; }

  // Handle the form submission
  onSubmit(): void {
    this.submitted = true;
    if (this.incidentForm.invalid) {
      return;
    }
    this.incident = {
      title: this.f.title.value,
      description: this.f.description.value,
      severity: this.f.severity.value
    };
    this.incidentService.createIncident(this.incident)
      .subscribe(
        // Handle success scenario
        () => {
          this.incidentForm.reset();
          this.error = null;
        },
        // Handle error scenario
        error => {
          this.error = 'Failed to submit incident: ' + error;
        }
      );
  }
}

/**
 * IncidentService
 * @description Service to handle incident data management.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private baseUrl = '/api/incidents';  // URL to web API

  constructor(private http: HttpClient) { }

  // Create a new incident
  createIncident(incident: Incident): Observable<any> {
    return this.http.post(this.baseUrl, incident).pipe(
      retry(3),  // Retry a failed request up to 3 times
      catchError(this.handleError)  // Catch and handle errors
    );
  }

  // Handle Http operation that failed
  private handleError(error: any): Observable<never> {
    // Let the app know something went wrong
    return throwError(error.message || 'An error occurred');
  }
}

/**
 * Incident Model
 * @description Model representing an incident.
 */
export interface Incident {
  title: string;
  description: string;
  severity: string;
}
