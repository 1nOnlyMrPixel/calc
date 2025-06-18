let DataOnDisp = "";
let DataOnMemoryPanel = "";
let prevBtnIsEquals = false;
let lastBtnIsOp = false;
let maxMemoryCharacter=41;
let maxDisplayPanelCharacters=22;
let val1 = null,
  val2 = null,
  op = null;
let result;
let DispOverflow=false;
let MemOverflow=false;

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
  DispOverflow=false;
}
function clearMemoryPanel() {
  memoryPanel.textContent = "";
  DataOnMemoryPanel = "";
  MemOverflow=false;
}
function resetValue() {
  val1 = null;
  val2 = null;
  op = null;
  MemOverflow=false;
  DispOverflow=false;
}
function getValueFromDU() {
  return displayPanel.textContent;
}
function calculateResult() {
  result = +operate(val1, val2, op);
  if (result % 1 !== 0) result = result.toFixed(2);
  console.log(`${val1} ${op} ${val2} = ${result}`);
}
function checkOverFlow()
{
  
  if(displayPanel.textContent.length>=maxDisplayPanelCharacters)
  {
    DispOverflow=true;
  }
  else
  {
    DispOverflow=false;
  }
  if(memoryPanel.textContent.length>maxMemoryCharacter )
  {
    MemOverflow=true;
    memoryPanel.textContent="Memory Overflow";
  }
  // console.log(`Memory Overflow:${MemOverflow}\nDisplay Overflow:${DispOverflow}`);
}

function Calculate(e) 
{
  checkOverFlow();

  // if(MemOverflow!==true)  // && DispOverflow!==true
    // { 
    if (checkBtnIsNum(e))           //if clicked btn is a numeric btn or not
       {
        if (prevBtnIsEquals) 
          {
          clearMemoryPanel();
          prevBtnIsEquals = false;
          }
        // if(DispOverflow!==true)
        //   {
        //   if(lastBtnIsOp && op !== null && val1 != null)
        //     DataOnMemoryPanel += op;
        //   DataOnDisp += getBtnValue(e);
        //   displayPanel.textContent = DataOnDisp;
        //   }
        //   else if(MemOverflow===true && DispOverflow==true)
        //   {
        //   DataOnDisp= getBtnValue(e);
        //   displayPanel.textContent = DataOnDisp;
        //   }
        

        if(lastBtnIsOp && op !== null && val1 != null)
          DataOnMemoryPanel += op;
          if(DispOverflow!==true)
          {
          DataOnDisp += getBtnValue(e);
          }
          else
            DataOnDisp=getBtnValue(e);
        displayPanel.textContent = DataOnDisp;
        lastBtnIsOp = false;
        }
    if (checkBtnIsOperator(e))      //checking the input btn is operator or not
      {
        //for clearing the memory panel on equals btn press before printing the result
        if(prevBtnIsEquals)
          {
          clearMemoryPanel();
          prevBtnIsEquals = false;
          }
        if (getValueFromDU() != "" && lastBtnIsOp != true)    //for preventing the user to input multiple operators simultaneously!!
          {
          DataOnMemoryPanel += getValueFromDU();                  
          if (val1 != null)
             val2 = +getValueFromDU();
          else 
              val1 = +getValueFromDU();
          clearDisplayPanel();
          if (val1 != null && val2 != null && op != null) 
            {
            calculateResult();
            val1 = result;
            displayPanel.textContent = result;
            }
          }
        op = getOperatorType(e);
        lastBtnIsOp = true;
      }
    if (e.target.id === "btnEqual") 
      {
      prevBtnIsEquals = true;
      if (val1 != null && getValueFromDU() != "") 
        val2 = +getValueFromDU();
      if (val1 != null && val2 != null && op != null)      //calculate only when val1,val2 & operator is available
        {
        DataOnMemoryPanel += getValueFromDU();
        clearDisplayPanel();
        calculateResult();
        resetValue();
        displayPanel.textContent = result;
        }
      op = null;
      }
    memoryPanel.textContent = DataOnMemoryPanel;
  if (e.target.id === "btnClear")                  //btn clear remains outside the input conditions bracket to rst whenever required
    {
    clearMemoryPanel();
    clearDisplayPanel();
    resetValue();
    }
  checkOverFlow();
}


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

btnBox.addEventListener("click", Calculate);