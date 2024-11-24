"use strict";
function add(n1, n2) {
    return n1 + n2;
}
function subtract(n1, n2) {
    return n1 - n2;
}
function multiply(n1, n2) {
    return n1 * n2;
}
function divide(n1, n2) {
    return n1 / n2;
}
function remainder(n1, n2) {
    return n1 % n2;
}
function operate(operator, n1, n2) {
    if (operator == "+") {
        return add(n1, n2);
    }
    else if (operator == "–") {
        return subtract(n1, n2);
    }
    else if (operator == "×") {
        if (!Number.isInteger(multiply(n1, n2)) &&
            multiply(n1, n2).toString().split(".")[1].length > 10) {
            return multiply(n1, n2).toFixed(10);
        }
        else {
            return multiply(n1, n2);
        }
    }
    else if (operator == "÷") {
        if (!Number.isInteger(divide(n1, n2)) &&
            divide(n1, n2).toString().split(".")[1].length > 10) {
            return divide(n1, n2).toFixed(10);
        }
        else {
            return divide(n1, n2);
        }
    }
    else if (operator == "%") {
        return remainder(n1, n2);
    }
}
function receiveInput(character) {
    if ((result === null || result === void 0 ? void 0 : result.textContent) == "Cannot divide by zero") {
        input = character;
        equation.textContent = character;
        result.textContent = "";
        storedValue = undefined;
        signThen = undefined;
        signNow = undefined;
    }
    else if (input.includes(".") && character === ".") {
    }
    else if (equation.textContent.split(" ")[2] !== "" &&
        (result === null || result === void 0 ? void 0 : result.textContent) !== "") {
        result.textContent = "";
        storedValue = undefined;
        input = character;
        equation.textContent = character;
    }
    else {
        input += character;
        equation.textContent += character;
    }
}
function listenForOperandClick() {
    numberButtons.forEach((numberButton) => {
        numberButton.addEventListener("click", () => {
            var _a;
            receiveInput((_a = numberButton.textContent) !== null && _a !== void 0 ? _a : "");
        });
    });
}
function listenForOperandKeyDown() {
    const numbers = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    window.addEventListener("keydown", (e) => {
        if (numbers.includes(e.key)) {
            receiveInput(e.key);
            if (e.key == ".") {
                const element = document.getElementById("d-point");
                element.classList.add("active");
            }
            else {
                const element = document.getElementById(`n${e.key}`);
                element.classList.add("active");
            }
        }
    });
    window.addEventListener("keyup", (e) => {
        if (numbers.includes(e.key)) {
            if (e.key == ".") {
                const element = document.getElementById("d-point");
                element.classList.remove("active");
            }
            else {
                const element = document.getElementById(`n${e.key}`);
                element.classList.remove("active");
            }
        }
    });
}
function handleOperator(operator) {
    if ((result === null || result === void 0 ? void 0 : result.textContent) == "Cannot divide by zero") {
    }
    else if (input === ".") {
        if (equation.textContent == ".") {
            storedValue = storedValue === undefined ? 0 : storedValue;
            equation.textContent = equation.textContent.replace(/./, "0");
            equation.textContent += " " + operator.(textContent !== null && textContent !== void 0 ? textContent : "") + " ";
            signThen = operator.textContent;
            input = "";
        }
        else if (equation.textContent.split(" ")[2] === ".") {
            input = "0";
            storedValue = storedValue === undefined ? 0 : storedValue;
            equation.textContent = equation.textContent.replace(/ [.]/, " 0");
            signNow = operator.textContent;
            if (signThen == "÷" || signThen == "%") {
                result.textContent = "Cannot divide by zero";
            }
            else {
                storedValue = operate(signThen !== null && signThen !== void 0 ? signThen : "", storedValue, +input);
                equation.textContent = storedValue + " " + signNow + " ";
                signThen = signNow;
                input = "";
            }
        }
    }
    else if (equation.textContent.split(" ")[1] != "" &&
        equation.textContent.split(" ")[2] === "") {
        equation.textContent = equation.textContent.replace(/ [^0-9]/, " " + operator.textContent);
        signThen = operator.textContent;
    }
    else if ((storedValue !== undefined && storedValue !== +input && input !== "") ||
        storedValue === +input) {
        signNow = operator.textContent;
        if ((equation.textContent.split(" ")[1] == "÷" ||
            equation.textContent.split(" ")[1] == "%") &&
            input == "0") {
            result.textContent = "Cannot divide by zero";
        }
        else {
            storedValue = operate(signThen !== null && signThen !== void 0 ? signThen : "", storedValue, +input);
            equation.textContent = storedValue + " " + signNow + " ";
            signThen = signNow;
            input = "";
        }
    }
    else if (equation.textContent.split(" ")[1] !== "" &&
        result.textContent !== "") {
        equation.textContent =
            result.textContent + " " + operator.textContent + " ";
        storedValue = +result.textContent;
        result.textContent = "";
        signThen = operator.textContent;
    }
    else if (storedValue !== undefined && input === "") {
        signThen = operator.textContent;
        equation.textContent += " " + operator.textContent + " ";
    }
    else {
        equation.textContent += " " + operator.textContent + " ";
        storedValue = +input;
        signThen = operator.textContent;
        input = "";
    }
}
function listenForOperatorClick() {
    operators.forEach((operator) => {
        operator.addEventListener("click", () => {
            handleOperator(operator);
        });
    });
}
function listenForOperatorKeyDown() {
    const currentOperators = ["+", "-", "/", "*", "%"];
    window.addEventListener("keydown", (e) => {
        if (currentOperators.includes(e.key)) {
            const dummyElement = document.createElement("div");
            if (e.key == "*") {
                dummyElement.textContent = "×";
                const element = document.querySelector(".multiplication");
                element.classList.add("active");
            }
            else if (e.key == "/") {
                dummyElement.textContent = "÷";
                const element = document.querySelector(".division");
                element.classList.add("active");
            }
            else if (e.key == "-") {
                dummyElement.textContent = "–";
                const element = document.querySelector(".subtraction");
                element.classList.add("active");
            }
            else if (e.key == "%") {
                dummyElement.textContent = e.key;
                const element = document.querySelector(".remainder");
                element.classList.add("active");
            }
            else {
                dummyElement.textContent = e.key;
                const element = document.querySelector(".addition");
                element.classList.add("active");
            }
            handleOperator(dummyElement);
        }
    });
    window.addEventListener("keyup", (e) => {
        if (e.key == "*") {
            const element = document.querySelector(".multiplication");
            element.classList.remove("active");
        }
        else if (e.key == "/") {
            const element = document.querySelector(".division");
            element.classList.remove("active");
        }
        else if (e.key == "-") {
            const element = document.querySelector(".subtraction");
            element.classList.remove("active");
        }
        else if (e.key == "%") {
            const element = document.querySelector(".remainder");
            element.classList.remove("active");
        }
        else if (e.key == "+") {
            const element = document.querySelector(".addition");
            element.classList.remove("active");
        }
    });
}
function handleEqual() {
    if (signThen === undefined && input !== "") {
        storedValue = +input;
        input = "";
    }
    else if (storedValue !== undefined && input === "") {
    }
    else if (storedValue === undefined && input === "") {
    }
    else if (equation.textContent.split(" ")[2] === ".") {
        if (signThen == "÷" || signThen == "%") {
            result.textContent = "Cannot divide by zero";
        }
        else {
            result.textContent = operate(signThen, storedValue, 0);
            storedValue = +result.textContent;
            input = "";
        }
    }
    else {
        if ((signThen == "÷" || signThen == "%") && input === "0") {
            result.textContent = "Cannot divide by zero";
        }
        else {
            result.textContent = operate(signThen, storedValue, +input);
            storedValue = +result.textContent;
            input = "";
        }
    }
}
function listenForEqualClick() {
    equal.addEventListener("click", () => {
        handleEqual();
    });
}
function listenForEqualKeyDown() {
    window.addEventListener("keydown", (e) => {
        if (e.key == "=") {
            const element = document.querySelector(".equal");
            element.classList.add("active");
            handleEqual();
        }
    });
    window.addEventListener("keyup", (e) => {
        const element = document.querySelector(".equal");
        element.classList.remove("active");
    });
}
function handleCE() {
    if (result.textContent !== "") {
        result.textContent = result.textContent;
    }
    else {
        let array = equation.textContent.split(/ /);
        array = array.slice(0, array.length - 1);
        equation.textContent = array.join(" ") + " ";
        input = "";
    }
}
let storedValue;
let input = "";
let equation = document.querySelector(".equation");
let result = document.querySelector(".result");
const numberButtons = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
let signThen;
let signNow;
const ce = document.querySelector(".ce");
const c = document.querySelector(".c");
ce.addEventListener("click", () => {
    handleCE();
});
window.addEventListener("keydown", (e) => {
    if (e.key == "Delete") {
        const element = document.querySelector(".ce");
        element.classList.add("active");
        handleCE();
    }
});
window.addEventListener("keyup", (e) => {
    const element = document.querySelector(".ce");
    element.classList.remove("active");
});
c.addEventListener("click", () => {
    input = "";
    result.textContent = "";
    equation.textContent = "";
    storedValue = undefined;
    signThen = undefined;
    signNow = undefined;
});
listenForOperandClick();
listenForOperandKeyDown();
listenForOperatorClick();
listenForOperatorKeyDown();
listenForEqualClick();
listenForEqualKeyDown();
