/**
 * ## Exercise 1: Basic Arithmetic Operations
 * Create a chain of promises to perform and log the result of three arithmetic operations in sequence.
 * Start with a number, then add 5, multiply by 3, and finally subtract 2.
 */

// version 1: just Promises and hardcode
function asyncArithmeticOperations(startNumber) {
  return new Promise((resolve) => resolve(startNumber))
    .then((result) => result + 5)
    .then((result) => result * 3)
    .then((result) => result - 2)
    .catch((error) =>
      console.error("Error in arithmetic operation chain:", error)
    );
}

asyncArithmeticOperations(10)
  .then((finalResult) => console.log("Final Result:", finalResult))
  .catch((error) => console.error("Error:", error));

// version 2: just Promises
function asyncArithmeticOperations2(baseNum, addNum, multiplyNum, ...args) {
  const result = new Promise((resolve, reject) => {
    const invalidInput = checkNums(baseNum, addNum, multiplyNum, args);
    if (invalidInput.length !== 0) {
      reject(invalidInput);
      return;
    }
    resolve(baseNum);
  });

  result
    .then((data) => data + addNum)
    .then((data) => data * multiplyNum)
    .then((data) => console.log("Final result: ", data))
    .catch((err) =>
      console.error("ERROR: some inputs are not Numbers: ", err.join(", "))
    );
}

function checkNums(...args) {
  return args.filter((item) => isNaN(item));
}

asyncArithmeticOperations2(100, 5, 3);
asyncArithmeticOperations2(100, "k", 3, "osne");


// ================ Exercise 2: String Manipulation 
/**
Write a promise chain that takes a string, 
converts it to uppercase, then reverses it, 
and finally appends the string "-finished" at the end. 
Log the final result. Use `then` for every phase
 */

function reversedUppercasedString(str) {
  const result = new Promise((resolve) => resolve(str));

  result
    .then((string) => string.toUpperCase())
    .then((string) => {
      let reversedStr = "";
      for (let i = string.length - 1; i >= 0; i--) {
        reversedStr += string[i];
      }
      return reversedStr;
    })
    .then((string) => string + "-finished")
    .then((string) => console.log(string))
    .catch((err) => console.error("Here the eror: ", err));
}



// ================ Exercise 3: Array Filtering and Mapping
/*
Write a function compareToNum that takes a number as an argument and returns a Promise
that tests if the value is less than or greater than the value 10 (reject otherwise)

compareToNum({num:10,isAboveNum:5}) //will reject
.then(result => console.log(result))
.catch(error => console.log(error))

compareToNum({num:10,isAboveNum:12}) //will resolve
.then(result => console.log(result))
.catch(error => console.log(error))
*/

function compareToNum({num,isAboveNum}){
    return new Promise((resolve, reject) =>{
        if (num > isAboveNum){
            reject(`${isAboveNum} is NOT GREATER than ${num}`);
            return;
        }
        resolve(`${isAboveNum} is GREATER than ${num}`);
    });
}

compareToNum({num:10,isAboveNum:5}) //will reject
.then(result => console.log(result))
.catch(error => console.error(error))

compareToNum({num:10,isAboveNum:12}) //will resolve
.then(result => console.log(result))
.catch(error => console.error(error))


// ================ Exercise 4: Delayed Greetings
/*
Simulate a delayed greeting with promises. 
First, wait 2 seconds, then log "Hello", 
wait another second, and log "World!". 
Each step should be done in a separate .then().
*/

// QUESTIONS !!! Do I HAVE TO make this function async ? 


// version 1
function delayedGreetings(){
    return new Promise(resolve => resolve())
        .then(() => new Promise (resolve => {
            setTimeout(() => {
                console.log('Hello');
                resolve();
            }, 2000);
        }))
        .then(() => new Promise (resolve => {
            setTimeout(() => {
                console.log(', World!')
            }, 1000);
        }))
        .catch(err => console.error("Something went wrong: ", err));
}

delayedGreetings();


// version 2

async function delayedGreetings2() {
    await new Promise(resolve => setTimeout(() => {
        console.log('Hello');
        resolve();
    }, 2000));

    await new Promise(resolve => setTimeout(() => {
        console.log(', World!');
        resolve();
    }, 1000));
}

delayedGreetings2().catch(err => console.error("Something went wrong: ", err));



// ================ Exercise 5: Error Handling
/*
Create a promise chain that attempts to parse JSON data. 
Use a try/catch block within a .then() method to handle JSON parsing errors. 
If successful, log the parsed object; 
if an error occurs, log "Invalid JSON".
*/


fetch('https://randomuser.me/api/?page=3&results=10&seed=abc')
    .then(response => {
        (async () => {
        try{
            const result = await response.json();
            console.log(result.results);
            throw new Error('just some error')
        }
        catch (err){
            console.error(err);
        }})();
    })

// ================ Bonus
// Make an async await version

async function getData(url){
    try {
        const response = await fetch(url);
        const responseJson = await response.json();
        return responseJson.results
    }
    catch (err){
        console.error("An error happened: ", err);
    }
}

let url = 'https://randomuser.me/api/?page=3&results=10&seed=abc';
let usersBatch = await getData(url);
console.log(usersBatch);


// ================  Exercise 6: Promise all
/*
Create "resolveImmediate" that resolves immediately to a number
Create "resolveDelayed" that resolves to a number after 2 seconds

function combine(prmX, prmY) {
  return Promise.all([prmX, prmY]).then((values) => {
  return values[0] + values[1];
  });
}

// `fetchX()` should return a promise that is resolved to 25 immediately
// and `fetchY()` should return a promise that is resolved after 2 seconds to 17

combine(resolveImmediate(), resolveDelayed())
.then((sum) => {
console.log(sum);
});
*/

function resolveImmediate(num){
    return new Promise(resolve => resolve(num));
}

function resolveDelayed(num){
    return new Promise (resolve => resolve(num))
        .then(date => new Promise (resolve => {
            setTimeout(()=>{
                resolve(date);
            }, 2000)
        }))
}

function combine(prmX, prmY) {
    return Promise.all([prmX, prmY]).then((values) => {
    return values[0] + values[1];
    });
  }

function fetchX(){
    return resolveImmediate(25);
}

function fetchY(){
    return resolveDelayed(17);
}

combine(fetchX(), fetchY())
  .then((sum) => {
  console.log(sum);
  });