// 代码生成时间: 2025-10-12 18:06:41
 * File Integrity Checker component for Angular
 *
 * This component allows users to verify the integrity of files by comparing
 * their checksums against a pre-defined reference.
 */

import { Component } from '@angular/core';
import * as crypto from 'crypto';

@Component({
  selector: 'app-file-integrity-checker',
  template: `<form #fileIntegrityForm="ngForm" (ngSubmit)="checkFileIntegrity()" (ngModelChange)="onFileChange()">
    <input #fileInput type="file" accept=".txt" (change)="onFileChange()">
    <button type="submit" [disabled]="!fileInput.value">Check Integrity</button>
    <p *ngIf="integrityStatus">File integrity: {{ integrityStatus }}</p>
  </form>`,
  styleUrls: ['./file_integrity_checker.component.css']
})
export class FileIntegrityCheckerComponent {
  // Reference checksum for the file
  private referenceChecksum: string = "";
  // Variable to hold the current status of file integrity
  integrityStatus: string = "";
  // Flag to indicate if the file has changed
  isFileChanged: boolean = false;

  /**
   * Constructor to initialize the component
   * @param {any} _any Any dependency to be injected, if necessary
   */
  constructor(private _any: any) {
    // Initialize the reference checksum if needed
    // this.referenceChecksum = "<your-reference-checksum>";
  }

  /**
   * Event handler for file input change
   */
  onFileChange(): void {
    this.isFileChanged = true;
  }

  /**
   * Event handler for form submission
   */
  checkFileIntegrity(): void {
    if (this.isFileChanged) {
      // Reset the integrity status
      this.integrityStatus = "";

      // Read the file and calculate its checksum
      const file: File | null = this.fileInput.value.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent) => {
          const content: ArrayBuffer = event.target?.result as ArrayBuffer;
          const checksum = this.calculateChecksum(new Uint8Array(content));

          // Compare the calculated checksum with the reference checksum
          if (checksum === this.referenceChecksum) {
            this.integrityStatus = "The file is intact and has not been modified.";
          } else {
            this.integrityStatus = "The file has been modified or is corrupted.";
          }
        };
        reader.onerror = (error) => {
          console.error("Error reading file: ", error);
          this.integrityStatus = "Error occurred while checking file integrity.";
        };
        reader.readAsArrayBuffer(file);
      } else {
        this.integrityStatus = "No file selected.";
      }
    } else {
      this.integrityStatus = "No changes detected.";
    }
  }

  /**
   * Calculate the checksum of the file content using SHA-256
   * @param {Uint8Array} fileContent The content of the file to calculate the checksum for
   * @returns {string} The SHA-256 checksum of the file content
   */
  private calculateChecksum(fileContent: Uint8Array): string {
    return crypto.createHash('sha256').update(fileContent).digest('hex');
  }
}
