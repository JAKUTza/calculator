let calcDisplay = '';
let firstOperand = '';
let secondOperand = '';
let currentOperation = '';
let operationResult = '';

document.querySelector('#calc-screen').textContent = '0';
//arifmethical functions.
function addition() {
    operationResult = firstOperand + secondOperand;
    document.querySelector('#calc-screen').textContent = operationResult;
    firstOperand = operationResult;
    secondOperand = '';
}
function substraction() {
    operationResult = firstOperand - secondOperand;
    document.querySelector('#calc-screen').textContent = operationResult;
    firstOperand = operationResult;
    secondOperand = '';
}
function multiplication() {
    operationResult = firstOperand * secondOperand;
    document.querySelector('#calc-screen').textContent = operationResult;
    firstOperand = operationResult;
    secondOperand = '';
}
function division() {
    if (secondOperand == 0) {
        clear();
    } else {
        operationResult = firstOperand / secondOperand;
        document.querySelector('#calc-screen').textContent = operationResult;
        firstOperand = operationResult;
        secondOperand = '';
    }
}
//function to update calculators screen when digits are pressed.
//
function updateScreen() {
    let keyValue = this.getAttribute('data-key');
    if (keyValue === '.') {
        if (calcDisplay === '') {
            calcDisplay = '0.';
        } else if (calcDisplay.includes('.')){
            console.log('already decimal');
        }   else {
            calcDisplay += keyValue;
        }
    } else {
        calcDisplay += keyValue;
    }
    
    document.querySelector('#calc-screen').textContent = calcDisplay;
}
//function that takes values from calcultors display and store it for
//next opeartions.
function operationPressed() {
    if (currentOperation) {
        secondOperand = calcDisplay;
    } else {
        firstOperand = calcDisplay;
    }
    currentOperation = this.getAttribute('data-key');
    if (firstOperand && secondOperand) {
        evaluateOperation();
    }
    calcDisplay = '';    
}
//evaluate operation
function evaluateOperation() {
    console.log('calculating!!');
    firstOperand = parseFloat(firstOperand);
    secondOperand = parseFloat(secondOperand);
    switch (currentOperation) {
        case '+':
            addition();
            break;
        case '-':
            substraction();
            break;
        case '*':
            multiplication();
            break;
        case '/':
            division();
            break;
    }

}
function evaluationButtonPressed() {
    secondOperand = calcDisplay;
    evaluateOperation();
    calcDisplay = '';
}
//AC button function
function clear() {
    console.log('clear functions is running!');
    calcDisplay = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = '';
    operationResult = '';
    document.querySelector('#calc-screen').textContent = '0';
}
function backspace() {
    if(calcDisplay.length > 1){
        calcDisplay = calcDisplay.slice(0, -1);
        document.querySelector('#calc-screen').textContent = calcDisplay;
    } else if(calcDisplay.length === 1){
        calcDisplay = '';
        document.querySelector('#calc-screen').textContent = '0';
    } else {
        console.log('nothing to delete');
    }
}

//create event listeners for all digit buttons.
const digitButtons = document.querySelectorAll('.controls');
digitButtons.forEach(button => {
    button.addEventListener('click', updateScreen);
});

//create event listeners for all operation buttons.
const operationButtons = document.querySelectorAll('.operation');
operationButtons.forEach(button => {
    button.addEventListener('click', operationPressed)
});
//create event listener for evaluation button.
const evaluationButton = document.querySelector('.evaluation');
evaluationButton.addEventListener('click', evaluationButtonPressed);

//create event listener for clear button.
const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clear);
//create event listener for backsapce button.
const backsapceButton = document.querySelector('.backspace');
backsapceButton.addEventListener('click', backspace);