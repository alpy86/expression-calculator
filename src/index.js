function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    var regexp = /\(\d|\d\)/i;
    if (regexp.test(expr)) {
        throw "ExpressionError: Brackets must be paired";
    }
    //console.log(regexp.test(string));
    var regexpSpace = /\d\s/i;
    if (regexpSpace.test(expr) == false) {
        var arrExpr = expr.split("");
    } else {
        var arrExpr = expr.split(" ");
    }
    var arrOut = [];
    var arrStack = [];
    var regexpNumber = /\d/i;
    //console.log(arrExpr);
    for (var i = 0; i < arrExpr.length; i++) {
        if (arrExpr[i] === "(") {
            arrStack.push(arrExpr[i]);
        }
        if (regexpNumber.test(arrExpr[i])) {
            arrOut.push(arrExpr[i]);
        }
        if (arrExpr[i] === "+" || arrExpr[i] === "-") {
            if (arrStack[arrStack.length - 1] === "+" || arrStack[arrStack.length - 1] === "-" || arrStack[arrStack.length - 1] === "*" || arrStack[arrStack.length - 1] === "/") {
                arrOut.push(arrStack.pop());
                if (arrStack[arrStack.length - 1] === "+" || arrStack[arrStack.length - 1] === "-") {
                    arrOut.push(arrStack.pop());
                }
            }
            arrStack.push(arrExpr[i]);
        }
        if (arrExpr[i] === "*" || arrExpr[i] === "/") {
            if (arrStack[arrStack.length - 1] === "*" || arrStack[arrStack.length - 1] === "/") {
                arrOut.push(arrStack.pop());
            }
            arrStack.push(arrExpr[i]);
        }
        if (arrExpr[i] === ")") {
            var j = arrStack.length - 1;
            var count = 0;
            //console.log("j"+j);
            while (arrStack[j] !== "(") {
                arrOut.push(arrStack.pop());
                j--;
                count++;
                if (count > 5) {
                    break;
                }
            }
            arrStack.pop();
        }
    }
    if (arrStack.length > 0) {
        arrOut.push(arrStack.pop());
    }
    if (arrStack.length > 0) {
        arrOut.push(arrStack.pop());
    }
    //console.log(arrOut);
    //console.log(arrStack);
    var arrTotal = [];
    for (var i = 0; i < arrOut.length; i++) {
        if (regexpNumber.test(arrOut[i])) {
            arrTotal.push(arrOut[i]);
        }
        if (arrOut[i] === "+") {
            var deleteValue1 = Number(arrTotal.pop());
            var deleteValue2 = Number(arrTotal.pop());
            arrTotal.push(deleteValue2 + deleteValue1);
            //console.log("+ "+arrTotal);
        }
        if (arrOut[i] === "-") {
            var deleteValue1 = arrTotal.pop();
            var deleteValue2 = arrTotal.pop();
            arrTotal.push(deleteValue2 - deleteValue1);
            //console.log("- "+arrTotal);
        }
        if (arrOut[i] === "*") {
            var deleteValue1 = arrTotal.pop();
            var deleteValue2 = arrTotal.pop();
            arrTotal.push(deleteValue2 * deleteValue1);
            //console.log("* "+arrTotal);
        }
        if (arrOut[i] === "/") {
            var deleteValue1 = arrTotal.pop();
            var deleteValue2 = arrTotal.pop();
            if (deleteValue2 / deleteValue1 === Infinity) {
                throw "TypeError: Division by zero.";
            }
            arrTotal.push(deleteValue2 / deleteValue1);
            //console.log("/ "+arrTotal);
        }
        //console.log("total "+arrTotal);
    }
    return Number(arrTotal);

}

module.exports = {
    expressionCalculator
}