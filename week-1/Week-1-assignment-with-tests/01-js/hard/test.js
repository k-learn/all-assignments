function atomicExpression(expr) {
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

function expressionWithBraces(expr) {
    expr = expr.split(" ").join("");
    if (!expr.match(/[\(\)]/g)) {
        return simpleExpression(expr);
    }

    while (expr.match(/\d+\.?\d*/g).length > 1) {
        if (expr.match(/\(([^)]+)\)/)) {
            expr = expr.replace(/\((.*?)\)/, simpleExpression(expr.match(/\((.*?)\)/)[1]));
        }
        expr = simpleExpression(expr);
    }

    return expr.match(/\d+\.?\d*/g)[0];
}

function simpleExpression(expr) {
    expr = expr.split(" ").join("");
    if (expr.match(/[^\+\-\*\/\d\.]/g)) {
        console.log(expr.match(/[^\+\-\*\/\d\.]/g));
        throw new Error("Invalid expression");
    }
    if (expr.split(/[^\d]/g).includes("")) {
        throw new Error("Invalid expression");
    }

    while (expr.match(/\d+\.?\d*/g).length > 1) {
        if (expr.match(/\//g)) {
            const re = /\d+\.?\d*\/\d+\.?\d*/;
            expr = expr.replace(re, atomicExpression(expr.match(re)[0]));
            continue;
        }
        if (expr.match(/\*/g)) {
            const re = /\d+\.?\d*\*\d+\.?\d*/;
            expr = expr.replace(re, atomicExpression(expr.match(re)[0]));
            continue;
        }
        if (expr.match(/\+/g)) {
            const re = /\d+\.?\d*\+\d+\.?\d*/;
            expr = expr.replace(re, atomicExpression(expr.match(re)[0]));
            continue;
        }
        if (expr.match(/\-/g)) {
            const re = /\d+\.?\d*\-\d+\.?\d*/;
            expr = expr.replace(re, atomicExpression(expr.match(re)[0]));
            continue;
        }
    }

    return expr.match(/\d+\.?\d*/g)[0];
}

let exp = '(2 + 3) * (6 - (4 + 1) / 2) + 7';
console.log(expressionWithBraces(exp));
