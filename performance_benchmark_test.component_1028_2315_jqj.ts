// 代码生成时间: 2025-10-28 23:15:03
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-performance-benchmark-test',
  templateUrl: './performance_benchmark_test.component.html',
  styleUrls: ['./performance_benchmark_test.component.css']
})
export class PerformanceBenchmarkTestComponent implements OnInit {
  // Function to be benchmarked
  private testFunction: () => void;
  // Number of iterations for the performance test
  private iterations: number;
  // Total time taken for all iterations
  private totalTime: number;
  // Time taken per execution
  private averageTime: number;
  // Flag to check if the test is running
  private isRunning: boolean;

  constructor() {
    this.iterations = 1000;
    this.totalTime = 0;
    this.isRunning = false;
  }

  ngOnInit(): void {
    // Initialize the test function and iterations if needed
  }

  /**
   * Sets the test function to be benchmarked
   *
   * @param func Function to be benchmarked
   */
  setTestFunction(func: () => void): void {
    this.testFunction = func;
  }

  /**
   * Starts the performance benchmark test
   */
  startTest(): void {
    if (this.isRunning) {
      console.error('Test is already running.');
      return;
    }

    this.isRunning = true;
    this.totalTime = 0;

    for (let i = 0; i < this.iterations; i++) {
      const startTime = performance.now();
      this.testFunction();
      const endTime = performance.now();
      this.totalTime += endTime - startTime;
    }

    this.averageTime = this.totalTime / this.iterations;
    this.isRunning = false;
    console.log(`Average time per execution: ${this.averageTime.toFixed(2)} milliseconds`);
  }

  /**
   * Stops the performance benchmark test if it is running
   */
  stopTest(): void {
    if (!this.isRunning) {
      console.error('Test is not running.');
      return;
    }

    this.isRunning = false;
  }

  /**
   * Resets the performance benchmark test
   */
  resetTest(): void {
    this.totalTime = 0;
  }

  /**
   * Sets the number of iterations for the performance test
   *
   * @param iterations Number of iterations
   */
  setIterations(iterations: number): void {
    this.iterations = iterations;
  }
}