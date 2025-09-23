// 代码生成时间: 2025-09-23 09:12:26
import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-text-file-analyzer',
  templateUrl: './text-file-analyzer.component.html',
  styleUrls: ['./text-file-analyzer.component.css']
})
export class TextFileAnalyzerComponent {
  // Model to hold the file content
  fileContent: string = '';
  
  // Model to hold the analysis results
  wordCount: number = 0;
  charCount: number = 0;
  lineCount: number = 0;
  
  // Error message
  errorMessage: string = '';
  
  // Http client for server-side communication
  http: HttpClient;
  
  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }

  // Method to handle file input
  handleFileInput(files: FileList): void {
    if (files.length === 0) {
      this.errorMessage = 'Please select a file.';
      return;
    }
    
    const file = files.item(0);
    if (!file) {
      this.errorMessage = 'No file selected.';
      return;
    }
    
    const reader = new FileReader();
    
    // Read the file content as text
    reader.onload = (event) => {
      this.fileContent = event.target['result'] as string;
      this.analyzeText();
    };
    
    // Error handling for file reading
    reader.onerror = (error) => {
      this.errorMessage = 'Error reading file: ' + error.message;
    };
    
    reader.readAsText(file);
  }
  
  // Method to analyze the text file content
  analyzeText(): void {
    try {
      this.wordCount = this.countWords(this.fileContent);
      this.charCount = this.countCharacters(this.fileContent);
      this.lineCount = this.countLines(this.fileContent);
    } catch (error) {
      this.errorMessage = 'Error analyzing file: ' + error.message;
    }
  }
  
  // Helper method to count words in a string
  countWords(text: string): number {
    return text.split(/\s+/).filter(Boolean).length;
  }
  
  // Helper method to count characters in a string
  countCharacters(text: string): number {
    return text.length;
  }
  
  // Helper method to count lines in a string
  countLines(text: string): number {
    return text.split('
').length;
  }
}
