//Create Calculator through DOM
const container = document.querySelector(".container");
const calculatorDOM = () => {
  const title = document.createElement("div");
  title.setAttribute("class", "title");
  title.innerHTML = `<h1 id="title">Calculator</h1>
  <p id="description">This calculator used be functional to perform addition, subtraction, multiplication and division</p>`;
  const div = document.createElement("div");
  div.setAttribute("class", "calculator");
  div.innerHTML = `
  
  <div class="result">
  
<input type="text"  class="previous-operand"/>
<input type="text" id="result" class = "current-operand" placeholder="0" />
</div>
<div class="buttons">
  <button style="color: red" data-clear id="clear">C</button>
  <button>
    <i class="fa-solid fa-arrow-left-long"></i>
  </button>
  <button data-number>.</button>
  <button data-operation>X</button>
  <button data-number id="7">7</button>
  <button data-number id="8">8</button>
  <button data-number id="9">9</button>
  <button data-operation>/</button>
  <button data-number id="4">4</button>
  <button data-number id="5">5</button>
  <button data-number id="6">6</button>
  <button data-operation id="subtract">-</button>
  <button data-number id="1">1</button>
  <button data-number id="2">2</button>
  <button data-number id="3">3</button>
  <button data-operation id="add">+</button>
  <button data-number>0</button>
  <button data-number>00</button>
  <button data-equals id="equal"
    style="grid-column: 3/5; background-color: #2d31fa; color: #fff"
  >
    =
  </button>
</div>
`;
  container.appendChild(title);
  container.appendChild(div);
};
calculatorDOM();

//Calculator class
class Calculator {
  constructor(currentOperandTextElement, previousOperandTextElement) {
    this.currentOperandTextElement = currentOperandTextElement;
    this.previousOperandTextElement = previousOperandTextElement;
    this.clear();
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  delete() {}
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand =
      this.currentOperandTextElement.value.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "X":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }
  updateDisplay() {
    this.currentOperandTextElement.value = this.currentOperand;
    if (this.operation != null) {
      this.previousOperandTextElement.value = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandTextElement.value = "";
    }
  }
}

// Get all the buttons

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-clear]");
const currentOperandTextElement = document.querySelector(".current-operand");
const previousOperandTextElement = document.querySelector(".previous-operand");

const calculator = new Calculator(
  currentOperandTextElement,
  previousOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
