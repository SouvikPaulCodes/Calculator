function add(a, b) {
    return a+b;
}

function sub(a, b) {
    return a-b;
}

function multiply(a, b) {
    return a*b;
}

function divide(a, b) {
    return a/b;
}

let input1='',
    input2='',
    operator='',
    result = 0;

function operation(a, b, operate) {
    switch(operate) {
        case '+':
            return add(a, b);
            break;

        case '-':
            return sub(a, b);
            break;

        case '*':
            return multiply(a, b);
            break;

        case '/':
            return divide(a, b);
            break;
    }
}

const display = document.querySelector(".display");

function displayScreen(a, b, operate) {
    if (a.length>16) {
        let c = a.slice(0,16);
        display.textContent = `${c}${operate}${b}`;
    } else {
        display.textContent = `${a}${operate}${b}`;
    }
}

const num1 = document.querySelector(".numbers");

num1.addEventListener("click", (event) => {
    if (event.target.className!=='equal' && event.target.className!=='numbers' && event.target.className!=='row'
        && !operator && !(input1==='0' && event.target.className==='0') 
        && `${input1}${operator}${input2}`.length<15) {
        if (event.target.className==='decimal'){
            if (!(input1.includes('.'))) {
                if (input1 === ''){
                    input1 += '0.'
                } else {
                    input1 += '.';
                }     
            }
        } else {
            input1 += event.target.className;
        }
    }

    if (!input1 && operator) {
        input1 = '0';
    }

    if(event.target.className!=='equal' && event.target.className!=='numbers' && event.target.className!=='row' 
        && input1 && operator && !(input2==='0' && event.target.className==='0') 
        && `${input1}${operator}${input2}`.length<15) {
        if (event.target.className==='decimal'){
            if (!(input2.includes('.'))) {
                if (input1 === ''){
                    input2 += '0.'
                } else {
                    input2 += '.';
                }    
            }
        } else {
            input2 += event.target.className;
        }
    }
    console.log(input1);
    console.log(input2);

    if (event.target.className==='equal' && input1 && operator && input2){
        result = operation(+input1, +input2, operator);
        if (result === Infinity) {
            input1 = ''
        } else {
            input1 = String(result);
        }
        input2 = '';
        operator = '';
    }

    console.log(result);

    if (result === Infinity) {
        displayScreen('Are U Serious!', input2, operator);
        result = 0;
    } else if (input1 === ''){
        displayScreen('0', input2, operator);
    } else {
        displayScreen(input1, input2, operator);
    }
});

const math = document.querySelector(".right");

math.addEventListener("click", (event) => {
    if (input1 && operator && input2) {
        result = operation(+input1, +input2, operator);
        if (result === Infinity) {
            input1 = ''
        } else {
            input1 = String(result);
        }
        input2 = '';
        operator = '';
        if (result === Infinity) {
            displayScreen('Are U Serious!', input2, operator);
            result = 0;
        } else if (input1 === ''){
            displayScreen('0', input2, operator);
        } else {
            displayScreen(input1, input2, operator);
        }
    }
    if (`${input1}${operator}${input2}`.length<15 && result!== Infinity) {
        switch(event.target.className) {
            case 'add':
                operator = '+';
                break;
    
            case 'sub':
                operator = '-';
                break; 
    
            case 'multiply':
                operator = '*';
                break;
    
            case 'divide':
                operator = '/';
                break;
        }
        console.log(operator);
    }
})

const clear = document.querySelector(".clear");

clear.addEventListener("click", (event) => {
    if (event.target.className === 'backspace') {
        if (!operator) {
            let ip = input1.split('');
            ip.splice(-1,1);
            input1 = ip.join('');
        } else {
            let ip = input2.split('');
            ip.splice(-1,1);
            input2 = ip.join('');
        }
    } else if (event.target.className === 'all-clear') {
        input1 = '';
        input2 = '';
        operator = '';
        result = 0;
    }
    if (input1 === ''){
        displayScreen('0', input2, operator);
    } else {
        displayScreen(input1, input2, operator);
    }
})

displayScreen('0', input2, operator);

