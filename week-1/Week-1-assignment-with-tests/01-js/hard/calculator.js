/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
  - `npm run test-calculator`
*/

class Calculator {
    
    constructor() {
        this.result = 0;
    }

    add(num) {
        this.result += num;
    }

    subtract(num) {
        this.result -= num;
    }

    multiply(num) {
        this.result *= num;
    }

    divide(num) {
        if (num === 0) {
            throw new Error("Zero division Error");
        }
        this.result /= num;
    }

    clear() {
        this.result = 0;
    }

    getResult() {
        return this.result;
    }

    atomicExpression(expr) {
        const operations = ["+", "-", "*", "/"];
        const operation = expr.split(/\d+\.?/g).join("");
        if (!operations.includes(operation)) {
            throw new Error("Invalid operation");
        }

        let numArr = expr.split(/[\+\-\*\/]/g);
        switch (operation) {
            case "+":
                return String(Number(numArr[0]) + Number(numArr[1]));
            case "-":
                return String(Number(numArr[0]) - Number(numArr[1]));
            case "*":
                return String(Number(numArr[0]) * Number(numArr[1]));
            case "/":
                return String(Number(numArr[0]) / Number(numArr[1]));
        }
    }

    simpleExpression(expr) {
        expr = expr.split(" ").join("");
        if (expr.match(/[^\+\-\*\/\d\.]/g)) {
            throw new Error("Invalid expression");
        }
        if (expr.split(/[^\d]/g).includes("")) {
            throw new Error("Invalid expression");
        }

        while (expr.match(/\d+\.?\d*/g).length > 1) {
            if (expr.match(/\//g)) {
                const re = /\d+\.?\d*\/\d+\.?\d*/;
                expr = expr.replace(re, this.atomicExpression(expr.match(re)[0]));
                continue;
            }
            if (expr.match(/\*/g)) {
                const re = /\d+\.?\d*\*\d+\.?\d*/;
                expr = expr.replace(re, this.atomicExpression(expr.match(re)[0]));
                continue;
            }
            if (expr.match(/\+/g)) {
                const re = /\d+\.?\d*\+\d+\.?\d*/;
                expr = expr.replace(re, this.atomicExpression(expr.match(re)[0]));
                continue;
            }
            if (expr.match(/\-/g)) {
                const re = /\d+\.?\d*\-\d+\.?\d*/;
                expr = expr.replace(re, this.atomicExpression(expr.match(re)[0]));
                continue;
            }
        }
        
        return expr.match(/\d+\.?\d*/g)[0];
    }

    expressionWithBraces(expr) {
        expr = expr.split(" ").join("");
        if (!expr.match(/[\(\)]/g)) {
            return this.simpleExpression(expr);
        }

        while (expr.match(/\d+\.?\d*/g).length > 1) {
            if (expr.match(/\(([^()]+)\)/)) {
                expr = expr.replace("("+expr.match(/\(([^()]+)\)/)[1]+")", this.expressionWithBraces(expr.match(/\(([^()]+)\)/)[1]));
            }
            expr = this.expressionWithBraces(expr);
        }

        return expr.match(/\d+\.?\d*/g)[0];
    }

    calculate(expr) {
        this.result = Number(this.expressionWithBraces(expr));
        return this.expressionWithBraces(expr); 
    }

}

module.exports = Calculator;
