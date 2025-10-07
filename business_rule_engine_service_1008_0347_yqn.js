// 代码生成时间: 2025-10-08 03:47:17
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusinessRuleEngineService {

  constructor() {}

  /**
   * Evaluates a business rule with the given context.
   * @param {Object} rule - The rule to evaluate.
   * @param {Object} context - The context in which the rule is evaluated.
   * @returns {Promise<boolean>} - A promise that resolves to true if the rule passes, false otherwise.
   */
  evaluateRule(rule: any, context: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        // Check if the rule is a function
        if (typeof rule === 'function') {
          // Execute the rule with the context and check the result
          const result = rule(context);
          // If the rule does not return a boolean, reject with an error
          if (typeof result !== 'boolean') {
            throw new Error('Rule must return a boolean value.');
          }
          resolve(result);
        } else {
          // If the rule is not a function, reject with an error
          throw new Error('Rule must be a function.');
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
