/*
take in 2 numbers
and return the sum
*/


// function declaration
function addNumbers(num1,num2){
    return num1+num2;
}


// function invocation (using)
addNumbers(1,3); // interfase of a function;


// camelCase: addNumbers
// kebub_case: add_numbers


/**
 * takes in 2 numbers, but also an operation
 * and retrun the operation result
 * 3,4,'ADD' = 7
 * 3,4,'MULTIPLY' = 12
 */

function calculate(num1,num2,operationStr){
    if(isAValidNumber(x) && isAValidNumber(x)){
        // I want to allow ONLY 'ADD' or 'MULTIPLY'
        if(operationStr === 'ADD'){
            return num1 + num2;
        }else if (operationStr === 'MULTIPLY'){
            return num1 * num2;
    }}
    return null;
}


// utility function

function isAValidNumber(x){
    if(isNaN(x)){
        return false;
    }
    return true;
}


function calculate2(num1,num2,operationStr){
    // I want to allow ONLY 'ADD' or 'MULTIPLY'
    const OPERATIONS = {
        ADD: 'ADD',
        MULTIPLY: 'MULTIPLY',
    };

    if(!Object.values(OPERATIONS).includes(operationStr)) return null;
    // if(isNaN(num1) || isNaN(num2)) return null;
    if(!isAValidNumber(num1) && !isAValidNumber(num2)) return null;

    if(operationStr === OPERATIONS.ADD){
        return num1 + num2;
    }
    
    if (operationStr === OPERATIONS.MULTIPLY){
        return num1 * num2;
    }

}

// five => 5
// !five => false
// !!five => true
// !!{a: 5} => true


function calculate3(num1,num2,operationStr){
    // I want to allow ONLY 'ADD' or 'MULTIPLY'
    const OPERATIONS = {
        ADD: 'ADD',
        MULTIPLY: 'MULTIPLY',
    };

    // if(!Object.values(OPERATIONS).includes(operationStr)) return null; //same in switch. But if we 
    if(!isAValidNumber(num1) && !isAValidNumber(num2)) return null;

    let operationStr = 'ADD'
    let result = 0
    switch(operationStr){
        case 'ADD':
            result = num1 + num2;
        case 'MULTIPLY':
            result = num1 * num2;
    }

    console.log(result) // ??? 
}
