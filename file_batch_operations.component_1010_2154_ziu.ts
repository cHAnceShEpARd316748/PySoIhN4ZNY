// 代码生成时间: 2025-10-10 21:54:58
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileOperationService } from './file-operation.service';
import { FileOperationResult } from './models/file-operation-result';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-file-batch-operations',
  templateUrl: './file-batch-operations.component.html',
  styleUrls: ['./file-batch-operations.component.css']
})
export class FileBatchOperationsComponent {
  files: File[] = [];
  results: FileOperationResult[] = [];
  errorMessage: string | null = null;

  // Constructor to inject the FileOperationService
  constructor(private fileOperationService: FileOperationService) {}

  // Method to handle file selection
  selectFiles(form: NgForm): void {
    const files = form.value.files as FileList;
    if (files.length === 0) {
      this.errorMessage = 'Please select at least one file.';
      return;
    }
    this.files = Array.from(files);
    this.processFiles();
  }

  // Method to process the selected files
  private processFiles(): void {
    this.results = [];
    this.errorMessage = null;

    this.files.forEach((file, index) => {
      this.fileOperationService.processFile(file).subscribe({
        next: (result: FileOperationResult) => {
          this.results[index] = result;
        },
        error: (error) => {
          this.errorMessage = `Error processing file ${index + 1}: ${error.message}`;
          console.error(error);
        }
      });
    });
  }
}

/*
 * FileOperationService
 * Provides file processing functionality
 */
import { Injectable } from '@angular/core';
import { FileOperationResult } from './models/file-operation-result';
import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileOperationService {

  constructor() {}

  // Method to process a single file
  processFile(file: File): Observable<FileOperationResult> {
    try {
      // Simulate file processing
      const result: FileOperationResult = {
        fileName: file.name,
        size: file.size,
        processed: true
      };
      return of(result);
    } catch (error) {
      return throwError(() => new Error(`Error processing file: ${error.message}`));
    }
  }
}

/*
 * FileOperationResult
 * Model to represent the result of file processing
 */
export interface FileOperationResult {
  fileName: string;
  size: number;
  processed: boolean;
}
