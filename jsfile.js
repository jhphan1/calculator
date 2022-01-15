// Create constants for HTML components
const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const xInput = document.querySelector("#xInput");
const operatorInput = document.querySelector("#operatorInput");
const yInput = document.querySelector("#yInput");
const decimal = document.querySelector("#decimal");
const clear = document.querySelector("#clear");
const backspace = document.querySelector("#backspace");

// Declare variables
let x;
let y;
let activeOperator;
let replaceDisplay = false;

// Add on-click event listeners
// Apply on-click visual effect to all buttons
buttons.forEach(button => button.addEventListener("click", () => {
    button.classList.add("clicked-button");
    // All buttons should also remove active-operator visual on click
    operators.forEach(operator => operator.classList.remove("active-operator"));
}))
buttons.forEach(button => button.addEventListener("transitionend", removeTransition));
numbers.forEach(number => number.addEventListener("click", (e) => inputNumber(e.target.innerHTML)));
decimal.addEventListener("click", inputDecimal);
operators.forEach(operator => operator.addEventListener("click", (e) => chooseOperator(e.target)));
equal.addEventListener("click", doEquals);
clear.addEventListener("click", doClear);
backspace.addEventListener("click", doBackspace);

// Keyboard support: uses HTML classes "a" + keyCode to match keydown to element
window.addEventListener("keydown", (e) => {
    const key = document.querySelector(`.a${e.keyCode}`);
    if (!key) return;
    // All key clicks should remove active-operator visual
    operators.forEach(operator => operator.classList.remove("active-operator"));
    // Number keys
    if (key.classList.contains("number")) inputNumber(key.textContent);
    // Operator keys
    if (key.classList.contains("operator")) chooseOperator(key);
    // Unique keys
    if (key.textContent === "Backspace") doBackspace();
    if (key.textContent === "Clear") doClear();
    if (key.textContent === "=") doEquals();
    if (key.textContent === ".") inputDecimal();
})


// Inputs number in display
function inputNumber(number) {
    // 0 can't be first number
    if (display.textContent.length === 0 && number === "0") return;
    // If replaceDisplay === true, create new number instead of appending number
    if (replaceDisplay) {
        display.textContent = number;
        replaceDisplay = false;
    } else {
        // Stop if display has 9 chars
        if (display.textContent.length === 9) return;
        // Append number to display
        display.textContent += number;
    }
}


// Inputs decimal in display
function inputDecimal() {
    // If replaceDisplay === true, create new number instead of appending number
    if (replaceDisplay) {
        display.textContent = "0.";
        replaceDisplay = false;
    } else {
        // Do nothing if display already has decimal
        if (display.textContent.length > 0 && !Number.isInteger(Number(display.textContent)) ||
                display.textContent === "0.") return;
        // Stop if display has 9 chars
        if (display.textContent.length === 9) return;
        // If first character, add "0" in front
        if (display.textContent.length === 0) {
            display.textContent = "0.";
        } else {
            display.textContent += ".";
        }
    }
}


// Chooses operator and calls calculate() if "y" is stored
function chooseOperator(operator) {
    // Apply active-operator visual effect to target operator
    operator.classList.add("active-operator");
    // Store current display as "x" or "y"
    if (!x) {
        x = Number(display.textContent);
    } else if (replaceDisplay != true) {
        y = Number(display.textContent);
    }
    // Run calculate() if all variables are there and set answer as new "x"
    if (y === 0 || y && activeOperator) x = calculate(x, y, activeOperator);
    // Store clicked operator
    activeOperator = operator.textContent;
    // Next number click should replace display
    replaceDisplay = true;
    // Reset "y" to disable re-calculating if operator immediately clicked again
    y = undefined;
}


// If x and operator are stored, Equals stores y and runs calculate on all variables
function doEquals() {
    // If no "x", do nothing
    if (!x) return;
    // Store current display as "y"
    if (!y && replaceDisplay != true) y = Number(display.textContent);
    // Run calculate function if "y" value is present, and set answer as new "x"
    if (y === 0 || y && activeOperator) x = calculate(x, y, activeOperator);
    // Next number click should replace display
    replaceDisplay = true;
    // Reset "y" to disable re-calculating if "=" immediately clicked again
    y = undefined;
}


// Clears display and resets all variables
function doClear() {
    display.textContent = "";
    x = undefined;
    y = undefined;
    activeOperator = undefined;
    replaceDisplay = false;
    xInput.textContent = "";
    operatorInput.textContent = "";
    yInput.textContent = "";
}


// Deletes last letter in display
function doBackspace() {
    // Only delete if there are characters in display, and the display is not a previous answer
    if (display.textContent.length > 0 && !replaceDisplay) {
        display.textContent = display.textContent.slice(0, -1);
    }
}


// Makes it so button on-click visual is brief
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove("clicked-button");
}


// Calculates number pair with given operator and shows answer on display
function calculate(x, y, operator) {
    let answer;

    // Show user input on display
    xInput.textContent = x;
    operatorInput.textContent = operator;
    yInput.textContent = y;

    // Convert variables to numbers
    x = Number(x);
    y = Number(y);

    switch (operator) {
        case "+":
            answer = x + y;
            break;
        case "-":
            answer = x - y;
            break;
        case "x":
            answer = x * y;
            break;
        case "÷":
            if (y === 0) {
                console.log("hi");
                display.textContent = "no :("
                return undefined;
            }
            answer = x / y;
            break;
    }
    // Round answers with decimals
    if (!Number.isInteger(answer)) answer = Number(answer.toFixed(3));
    // If too big, toExponential()
    if (answer.toString().length > 9) answer = answer.toExponential(3);
    
    // Show answer on display
    display.textContent = answer;

    return answer;
}