// Create variables for HTML components
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
const del = document.querySelector("#del");

// Declare variables
let x;
let y;
let activeOperator;
let replaceDisplay = false;

// Apply on-click visual effect to all buttons
buttons.forEach(button => button.addEventListener("click", () => button.classList.add("clicked-button")));
buttons.forEach(button => button.addEventListener("transitionend", removeTransition));

// Number button on-click functions
numbers.forEach(number => number.addEventListener("click", (e) => {
    // 0 can't be first number
    if (display.textContent.length === 0 && e.target.innerHTML === "0") return;
    // If replaceDisplay === true, create new number instead of appending number
    if (replaceDisplay) {
        display.textContent = e.target.innerHTML;
        replaceDisplay = false;
    } else {
        // Stop if display has 9 chars
        if (display.textContent.length === 9) return;
        // Append number to display
        display.textContent += e.target.innerHTML;
    }
    // Remove active-operator visual from all operators
    operators.forEach(operator => operator.classList.remove("active-operator"));
}))

// TODO: Decimal button on-click function
decimal.addEventListener("click", (e) => {
    // TODO: Do nothing if display already has decimal
    if (display.textContent.length > 0 && Number.isInteger(display.textContent)) return;
    // If first character, add "0" in front
    if (display.textContent.length === 0) {
        display.textContent = "0.";
    } else {
        display.textContent += e.target.innerHTML;
    }
})

// Clear button on-click function
clear.addEventListener("click", () => {
    display.textContent = "";
    x = undefined;
    y = undefined;
    activeOperator = undefined;
    xInput.textContent = "";
    operatorInput.textContent = "";
    yInput.textContent = "";
})

// Del button on-click function
del.addEventListener("click", () => {
    if (display.textContent.length > 0) {
        display.textContent = display.textContent.slice(0, -1);
    }
})

// Operator button on-click functions
operators.forEach(operator => operator.addEventListener("click", (e) => {
    // Remove active-operator visual from all operators
    operators.forEach(operator => operator.classList.remove("active-operator"));
    // Apply active-operator visual effect to target operator
    operator.classList.add("active-operator");
    // Next number click should replace display
    replaceDisplay = true;
    // Store current display as "x" or "y"
    if (!x) {
        x = Number(display.textContent);
    } else {
        y = Number(display.textContent);
    }
    // Run calculate() if all variables are there and set answer as new "x"
    if (x && y && activeOperator) x = calculate(x, y, activeOperator);
    // Store clicked operator
    activeOperator = e.target.innerHTML;
}))

// "=" button on-click functions
equal.addEventListener("click", () => {
    // If no "x", do nothing
    if (!x) return;
    // Store current display as "y"
    if (!y) y = Number(display.textContent);
    // Run calculate function and set answer as new "x"
    x = calculate(x, y, activeOperator);
    // Replace display with next number
    replaceDisplay = true;
    // Remove active-operator visual from all operators
    operators.forEach(operator => operator.classList.remove("active-operator"));
    // What happens when "=" pushed again
})


// Makes it so button on-click visual is brief
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove("clicked-button");
}


// Function runs when user presses "="
function calculate(x, y, operator) {
    let answer;

    // Show user input on display
    xInput.textContent = x;
    operatorInput.textContent = operator;
    yInput.textContent = y;

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
                display.textContent = "no :("
                return undefined;
            }
            answer = x / y;
            break;
    }
    // Round answers with decimals
    if (!Number.isInteger(answer)) answer = answer.toFixed(3);
    // If too big, toExponential()
    if (answer.toString().length > 9) answer = answer.toExponential(3);
    
    // Show answer on display
    display.textContent = answer;

    return answer;
}