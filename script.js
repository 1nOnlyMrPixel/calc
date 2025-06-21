let DataOnDisp = "";
let DataOnMemoryPanel = "";
let prevBtnIsEquals = false;
let lastBtnIsOp = false;
let prevBtnIsDot=false;
let maxMemoryCharacter=41;
let maxDisplayPanelCharacters=22;
let val1 = null,
  val2 = null,
  op = null;
let result;
let DispOverflow=false;
let MemOverflow=false;
let prevOPBtn=null;
const btnBox = document.querySelector(".btnBox");
const displayPanel = document.querySelector(".displayPanel");
const memoryPanel = document.querySelector(".displayMemory");
const calcContainer=document.querySelector(".CalculatorContainer");
let LastLastEqualForDot=false;
function checkBtnIsNum(e) {
  return e.target.id.slice(0, 3) === "Num";
}
function checkBtnIsOperator(e) {
  if(e.target.id.slice(0, 2) === "OP" && (memoryPanel.textContent!=="" || displayPanel.textContent!=="") && getValueFromDU().slice(-1)!==".")
    {
      if(prevOPBtn!==null)
        {
          prevOPBtn.classList.toggle("clicked");
          e.target.classList.toggle("clicked");
          prevOPBtn=e.target;
        }
        else
        {
          prevOPBtn=e.target;
          prevOPBtn.classList.toggle("clicked");
        }
    }
  return e.target.id.slice(0, 2) === "OP";
}
function checkDisplayPanelIsEmpty()
{
  return getValueFromDU()==="";
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
  prevBtnIsDot=false;
  if(prevOPBtn!==null && prevOPBtn.classList.contains("clicked"))
    prevOPBtn.classList.remove("clicked");
  prevOPBtn=null;
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
}

function Calculate(e) 
{
  console.log(e);
  checkOverFlow();
     if(e.target.id==="btnBackSpace" && checkDisplayPanelIsEmpty()===false)    //for backspace btn
        {
            if(DataOnDisp.slice(-1)==".")
              prevBtnIsDot=false;
             DataOnDisp=DataOnDisp.slice(0,DataOnDisp.length-1) ;
             displayPanel.textContent=DataOnDisp;
        }
    if (checkBtnIsNum(e))           //if clicked btn is a numeric btn or not
       {
        LastEqualForDot=false;
        if (prevBtnIsEquals) 
          {
            LastEqualForDot=true;
          clearMemoryPanel();
          prevBtnIsEquals = false;
          }
        if(lastBtnIsOp && op !== null && val1 != null)
          DataOnMemoryPanel += op;
          if(DispOverflow!==true)
          {
            if(getBtnValue(e)==="." && prevBtnIsDot===false && checkDisplayPanelIsEmpty()===false && lastBtnIsOp===false && LastEqualForDot===false) 
            {
              prevBtnIsDot=true;
              DataOnDisp+=getBtnValue(e);  
            }
            if(getBtnValue(e)!==".") 
            {
              DataOnDisp += getBtnValue(e);
            }
          }
          else
            DataOnDisp=getBtnValue(e);
        displayPanel.textContent = DataOnDisp;
        lastBtnIsOp = false;
        }
    if (checkBtnIsOperator(e) && getValueFromDU().slice(-1)!=="." )      //checking the input btn is operator or not and not a dot operator
      {
        prevBtnIsDot=false;
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
      lastBtnIsOp=false;
      prevBtnIsEquals = true;
      if (val1 != null && getValueFromDU() != "") 
        val2 = +getValueFromDU();
      if(val1!=null && getValueFromDU()==="")
      {                                                         //sets results to val1 when val1 is available and equals btn is hit
        result=val1;
        clearDisplayPanel();
        resetValue();
        displayPanel.textContent=result;
      }
      else if (val1 != null && val2 != null && op != null)      //calculate only when val1,val2 & operator is available
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
function mod(a,b)
{
  return(a%b);
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
          case "%":
            return mod(a,b);
      break;
    }
  }

btnBox.addEventListener("click", Calculate);

let clickEvent = new MouseEvent('click',{                //Bubbling must be true in order the capture the event at the parent i.e BtnBox
    "view": window, 
    "bubbles": true,
    "cancelable": false});

document.addEventListener("keydown",handleKeyDown);

function handleKeyDown(e)
{
switch(e.key)
{
  //numeric btns dispatching click events 
  case "1": document.querySelector("#NumBtnOne").dispatchEvent(clickEvent);
  break;
  case "2": document.querySelector("#NumBtnTwo").dispatchEvent(clickEvent);
  break;
  case "3": document.querySelector("#NumBtnThree").dispatchEvent(clickEvent);
  break;
  case "4": document.querySelector("#NumBtnFour").dispatchEvent(clickEvent);
  break;
  case "5": document.querySelector("#NumBtnFive").dispatchEvent(clickEvent);
  break;
  case "6": document.querySelector("#NumBtnSix").dispatchEvent(clickEvent);
  break;
  case "7": document.querySelector("#NumBtnSeven").dispatchEvent(clickEvent);
  break;
  case "8": document.querySelector("#NumBtnEight").dispatchEvent(clickEvent);
  break;
  case "9": document.querySelector("#NumBtnNine").dispatchEvent(clickEvent);
  break;
  case "0": document.querySelector("#NumBtnZero").dispatchEvent(clickEvent);
  break;
  //operators
   case "+": document.querySelector("#OPbtnPlus").dispatchEvent(clickEvent);
  break;
  case "-": document.querySelector("#OPbtnMinus").dispatchEvent(clickEvent);
  break;
  case "*": document.querySelector("#OPbtnMultiply").dispatchEvent(clickEvent);
  break;
  case "/": e.preventDefault();
            document.querySelector("#OPbtnDivide").dispatchEvent(clickEvent);
  break;
  case "%": document.querySelector("#OPbtnMod").dispatchEvent(clickEvent);
  break;
  case ".": document.querySelector("#NumBtnDot").dispatchEvent(clickEvent);
  break;
  //special keys
  case "Enter":   e.preventDefault();
                  document.querySelector("#btnEqual").dispatchEvent(clickEvent);
  break;
  case "Escape": document.querySelector("#btnClear").dispatchEvent(clickEvent);
  break;
  case "Backspace": document.querySelector("#btnBackSpace").dispatchEvent(clickEvent);
  break;
}
}