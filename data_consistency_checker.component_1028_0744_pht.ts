// 代码生成时间: 2025-10-28 07:44:27
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-consistency-checker',
  templateUrl: './data_consistency_checker.component.html',
  styleUrls: ['./data_consistency_checker.component.css']
})
export class DataConsistencyCheckerComponent implements OnInit {

  // Inputs to hold the data to compare
  @Input() dataSet1: any[];
  @Input() dataSet2: any[];

  // Result of the consistency check
  checkResult: boolean = false;
  error: string | null = null;

  /**
   * Constructor
   * @param {any} {}
   */
  constructor() {
  }

  /**
   * ngOnInit: Lifecycle hook that is called after the first «ngOnInit».
   * It is a good place to perform initialization work.
   */
  ngOnInit(): void {
    try {
      this.checkConsistency();
    } catch (error) {
      this.error = error.message;
    }
  }

  /**
   * checkConsistency: Method to check the consistency of the two datasets.
   * It compares the length and each corresponding element of the arrays.
   *
   * @returns {void}
   */
  checkConsistency(): void {
    // Check if both datasets are provided
    if (!this.dataSet1 || !this.dataSet2) {
      throw new Error('Both datasets are required for consistency check.');
    }

    // Check if both datasets have the same length
    if (this.dataSet1.length !== this.dataSet2.length) {
      throw new Error('Datasets have different lengths.');
    }

    // Compare each corresponding element
    for (let i = 0; i < this.dataSet1.length; i++) {
      if (this.dataSet1[i] !== this.dataSet2[i]) {
        throw new Error(`Discrepancy found at index ${i}: ${this.dataSet1[i]} !== ${this.dataSet2[i]}`);
      }
    }

    // If no discrepancies, set checkResult to true
    this.checkResult = true;
  }

  /**
   * isError: Helper method to check if there was an error during check.
   *
   * @returns {boolean}
   */
  isError(): boolean {
    return this.error !== null;
  }
}
