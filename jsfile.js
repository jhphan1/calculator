const display = document.querySelector("#display");

// Apply on-click visual effect to all buttons
const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener("click", () => button.classList.add("clicked-button")));
buttons.forEach(button => button.addEventListener("transitionend", removeTransition));

// Number button on-click functions
const numbers = document.querySelectorAll(".number");
numbers.forEach(number => number.addEventListener("click", (e) => {
    // Stop if display has 9 chars
    if (display.textContent.length === 9) return;
    // 0 can't be first number
    if (display.textContent.length === 0 && e.target.innerHTML === "0") return;
    // Append number to display
    display.textContent += e.target.innerHTML;
}))

// TODO: Operator button on-click functions
const operators = document.querySelectorAll(".operator");
operators.forEach(operator => operator.addEventListener("click", (e) => {
    // Store clicked operator
    let activeOperator = e.target.innerHTML;
    // Apply active-operator visual effect
    operator.classList.add("active-operator");
}))

// TODO: = button on-click functions


// Makes it so button on-click visual is brief
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove("clicked-button");
}


// Function runs when user presses "="
function calculate(x, y, operator) {
    switch (operator) {
        case "+":
            return x + y;
        case "-":
            return x - y;
        case "*":
            return x * y;
        case "/":
            if (y === 0) return "ERROR";
            return x / y;
            
    }
}