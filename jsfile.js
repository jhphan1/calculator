function operate(x, y, operator) {
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