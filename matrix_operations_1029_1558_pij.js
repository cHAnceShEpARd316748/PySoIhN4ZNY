// 代码生成时间: 2025-10-29 15:58:14
// matrix_operations.js
// A simple matrix operation library using JavaScript and Angular framework.

// Define a service for matrix operations
angular.module('matrixApp', [])
.service('MatrixService', [function() {
    // Adds two matrices of the same dimensions
    this.addMatrices = function(matrixA, matrixB) {
        // Check if the matrices are of the same size
        if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
            throw new Error('Matrices must be of the same size');
        }
        
        let result = [];
        for (let i = 0; i < matrixA.length; i++) {
            result[i] = [];
            for (let j = 0; j < matrixA[i].length; j++) {
                result[i][j] = matrixA[i][j] + matrixB[i][j];
            }
        }
        return result;
    };

    // Subtracts two matrices of the same dimensions
    this.subtractMatrices = function(matrixA, matrixB) {
        // Check if the matrices are of the same size
        if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
            throw new Error('Matrices must be of the same size');
        }
        
        let result = [];
        for (let i = 0; i < matrixA.length; i++) {
            result[i] = [];
            for (let j = 0; j < matrixA[i].length; j++) {
                result[i][j] = matrixA[i][j] - matrixB[i][j];
            }
        }
        return result;
    };

    // Multiplies two matrices
    this.multiplyMatrices = function(matrixA, matrixB) {
        // Check if the number of columns in A is equal to the number of rows in B
        if (matrixA[0].length !== matrixB.length) {
            throw new Error('Matrix A columns must be equal to Matrix B rows');
        }
        
        let result = [];
        for (let i = 0; i < matrixA.length; i++) {
            result[i] = [];
            for (let j = 0; j < matrixB[0].length; j++) {
                let sum = 0;
                for (let k = 0; k < matrixA[0].length; k++) {
                    sum += matrixA[i][k] * matrixB[k][j];
                }
                result[i][j] = sum;
            }
        }
        return result;
    };

    // Transposes a matrix
    this.transposeMatrix = function(matrix) {
        let result = [];
        for (let i = 0; i < matrix[0].length; i++) {
            result[i] = [];
            for (let j = 0; j < matrix.length; j++) {
                result[i][j] = matrix[j][i];
            }
        }
        return result;
    };
}]);

// Define a controller to use the matrix operations
angular.module('matrixApp')
.controller('MatrixController', ['$scope', 'MatrixService', function($scope, MatrixService) {
    $scope.matrixA = [[1, 2], [3, 4]];
    $scope.matrixB = [[5, 6], [7, 8]];

    $scope.add = function() {
        try {
            $scope.result = MatrixService.addMatrices($scope.matrixA, $scope.matrixB);
        } catch (e) {
            $scope.error = e.message;
        }
    };

    $scope.subtract = function() {
        try {
            $scope.result = MatrixService.subtractMatrices($scope.matrixA, $scope.matrixB);
        } catch (e) {
            $scope.error = e.message;
        }
    };

    $scope.multiply = function() {
        try {
            $scope.result = MatrixService.multiplyMatrices($scope.matrixA, $scope.matrixB);
        } catch (e) {
            $scope.error = e.message;
        }
    };

    $scope.transpose = function() {
        $scope.result = MatrixService.transposeMatrix($scope.matrixA);
    };
}]);