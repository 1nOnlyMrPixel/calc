let prevVal=null;
let DataOnDisp="";
let DataOnMemoryPanel="";
let prevOperator=null;
let inputNum="";
let currentOperator="";

const btnBox=document.querySelector(".btnBox");
const displayPanel=document.querySelector(".displayPanel");
const memoryPanel=document.querySelector(".displayMemory");

function checkBtnIsNum(e)
{
    return (e.target.id.slice(0,3)==="Num");
}
function checkBtnIsOperator(e)
{
     return (e.target.id.slice(0,2)==="OP");
}
function getBtnValue(e)
{
   return e.target.textContent;
}
function getOperatorType(e)
{
    return e.target.textContent;
}

function clearDisplayPanel()
{
    displayPanel.textContent="";
    DataOnDisp="";
}
function clearMemoryPanel()
{
     memoryPanel.textContent="";
    DataOnMemoryPanel="";
}
function clearOldValue()
{
    prevVal=null;
    prevOperator=null;
}
function Calculate(e)
{
    if(checkBtnIsNum(e))  //if clicked btn is a numeric btn
    {
        DataOnDisp+=getBtnValue(e);
        displayPanel.textContent=DataOnDisp;
    }
    else if(checkBtnIsOperator(e))   //if clicked btn is an operator
    {
        inputNum=+displayPanel.textContent;
        currentOperator=getOperatorType(e);
        if(prevOperator===null)
            prevOperator=currentOperator;
        DataOnMemoryPanel+=DataOnDisp+currentOperator;
        memoryPanel.textContent=DataOnMemoryPanel;
        clearDisplayPanel();
           if(prevVal===null)
            {
                prevVal=inputNum;
            }
           else
            {
                prevVal=+operate(prevVal,inputNum,prevOperator);
                displayPanel.textContent=prevVal;
            }
           if(currentOperator==="=")
           {    
               DataOnMemoryPanel=prevVal;
                clearOldValue();
           }
           else
            prevOperator=currentOperator;
    }
    else if(e.target.id==="btnClear")
        {
            clearDisplayPanel();
            clearMemoryPanel();
            clearOldValue();
        }
}





btnBox.addEventListener("click",Calculate);




        function add(a,b)
            {
                return a+b;
            }
        function sub(a,b)
            {
                return a-b;
            }
        function mult(a,b)
            {
                return a*b;
            }
        function div(a,b)
            {
                return (a/b).toFixed(2);
            }    
        function operate(a,b,operator)
            {
                switch(operator)
                {
                    case '+': return(add(a,b));
                              break;
                    case '-': return(sub(a,b));
                              break;
                    case '*': return(mult(a,b));
                              break;
                    case '/': return(div(a,b));
                              break;
                }
            }
