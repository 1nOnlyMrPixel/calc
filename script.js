let DataOnDisp = "";
let DataOnMemoryPanel = "";
let prevBtnIsEquals = false;
let lastBtnIsOp = false;

let val1 = null,
  val2 = null,
  op = null;
let result;

const btnBox = document.querySelector(".btnBox");
const displayPanel = document.querySelector(".displayPanel");
const memoryPanel = document.querySelector(".displayMemory");

function checkBtnIsNum(e) {
  return e.target.id.slice(0, 3) === "Num";
}
function checkBtnIsOperator(e) {
  return e.target.id.slice(0, 2) === "OP";
}
function getBtnValue(e) {
  return e.target.textContent;
}
function getOperatorType(e) {
  return e.target.textContent;
}

function clearDisplayPanel() {
  displayPanel.textContent = "";
  DataOnDisp = "";
}
function clearMemoryPanel() {
  memoryPanel.textContent = "";
  DataOnMemoryPanel = "";
}
function resetValue() {
  val1 = null;
  val2 = null;
  op = null;
}
function getValueFromDU() {
  return displayPanel.textContent;
}
function calculateResult() {
  result = +operate(val1, val2, op);
  if (result % 1 !== 0) result = result.toFixed(2);
  console.log(`${val1} ${op} ${val2} = ${result}`);
}

function Calculate(e) {
  if (checkBtnIsNum(e)) {
    //if clicked btn is a numeric btn
    if (prevBtnIsEquals) {
      clearMemoryPanel();
      prevBtnIsEquals = false;
    }
    if (lastBtnIsOp && op !== null && val1 != null) DataOnMemoryPanel += op;
    lastBtnIsOp = false;
    DataOnDisp += getBtnValue(e);
    displayPanel.textContent = DataOnDisp;
  }
  if (checkBtnIsOperator(e)) {
    if (prevBtnIsEquals) {
      clearMemoryPanel();
      prevBtnIsEquals = false;
    }

    if (getValueFromDU() != "" && lastBtnIsOp != true) {
      DataOnMemoryPanel += getValueFromDU();
      if (val1 != null) val2 = +getValueFromDU();
      else val1 = +getValueFromDU();
      clearDisplayPanel();
      if (val1 != null && val2 != null && op != null) {
        console.log("entered");
        calculateResult();
        val1 = result;
        displayPanel.textContent = result;
      }
    }
    op = getOperatorType(e);
    lastBtnIsOp = true;
  }
  if (e.target.id === "btnEqual") {
    prevBtnIsEquals = true;
    if (val1 != null && getValueFromDU() != "") val2 = +getValueFromDU();
    if (val1 != null && val2 != null && op != null) {
      DataOnMemoryPanel += getValueFromDU();
      clearDisplayPanel();
      calculateResult();
      resetValue();
      displayPanel.textContent = result;
    }
    op = null;
  } else if (e.target.id === "btnClear") {
    clearMemoryPanel();
    clearDisplayPanel();
    resetValue();
  }
  memoryPanel.textContent = DataOnMemoryPanel;
}

btnBox.addEventListener("click", Calculate);

function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
function mult(a, b) {
  return a * b;
}
function div(a, b) {
  return (a / b).toFixed(2);
}
function operate(a, b, operator) {
  switch (operator) {
    case "+":
      return add(a, b);
      break;
    case "-":
      return sub(a, b);
      break;
    case "*":
      return mult(a, b);
      break;
    case "/":
      return div(a, b);
      break;
  }
}
