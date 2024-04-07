# Exercises with Promises Chaining

## Exercise 1: Basic Arithmetic Operations
Create a chain of promises to perform and log the result of three arithmetic operations in sequence. 
Start with a number, then add 5, multiply by 3, and finally subtract 2.

## Exercise 2: String Manipulation
Write a promise chain that takes a string, 
converts it to uppercase, 
then reverses it, 
and finally appends the string "-finished" at the end. 
Log the final result.
Use `then` for every phase

## Exercise 3: Array Filtering and Mapping
Write a function compareToNum that takes a number as an argument and returns a Promise
that tests if the value is less than or greater than the value 10 (reject otherwise)

compareToNum({num:10,isAboveNum:5}) //will reject
.then(result => console.log(result))
.catch(error => console.log(error))

compareToNum({num:10,isAboveNum:12}) //will resolve
.then(result => console.log(result))
.catch(error => console.log(error))

## Exercise 4: Delayed Greetings
Simulate a delayed greeting with promises. 
First, wait 2 seconds, then log "Hello", 
wait another second, and log "World!". 
Each step should be done in a separate .then().

## Exercise 5: Error Handling
Create a promise chain that attempts to parse JSON data. 
Use a try/catch block within a .then() method to handle JSON parsing errors. 
If successful, log the parsed object; 
if an error occurs, log "Invalid JSON".

### Bonus
Make an async await version


## Exercise 6: Promise all
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



============================================================================================
not task, just info

# example of Promise
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

doSomething()
  .then((url) => fetch(url))
  .then((res) => res.json())
  .then((data) => {
    listOfIngredients.push(data);
  })
  .then(() => {
    console.log(listOfIngredients);
  });


## same example with async/await approach
async function logIngredients() {
  const url = await doSomething();
  const res = await fetch(url);
  const data = await res.json();
  listOfIngredients.push(data);
  console.log(listOfIngredients);
}


# example of async/await
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling');
  const result = await resolveAfter2Seconds();
  console.log(result);
  // Expected output: "resolved"
}

asyncCall();


==============

async function foo() {
  return 1;
}

same as 

function foo() {
  return Promise.resolve(1);
}

## NOTE

Note:

Even though the return value of an async function behaves as if it's wrapped in a Promise.resolve, they are not equivalent.

An async function will return a different reference, whereas Promise.resolve returns the same reference if the given value is a promise.

It can be a problem when you want to check the equality of a promise and a return value of an async function.


const p = new Promise((res, rej) => {
  res(1);
});

async function asyncReturn() {
  return p;
}

function basicReturn() {
  return Promise.resolve(p);
}

console.log(p === basicReturn()); // true
console.log(p === asyncReturn()); // false


# Sequence of promises

function resolveAfter2Seconds() {
  console.log("starting slow promise");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("slow");
      console.log("slow promise is done");
    }, 2000);
  });
}

function resolveAfter1Second() {
  console.log("starting fast promise");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("fast");
      console.log("fast promise is done");
    }, 1000);
  });
}

async function sequentialStart() {
  console.log("== sequentialStart starts ==");

  // 1. Start a timer, log after it's done
  const slow = resolveAfter2Seconds();
  console.log(await slow);

  // 2. Start the next timer after waiting for the previous one
  const fast = resolveAfter1Second();
  console.log(await fast);

  console.log("== sequentialStart done ==");
}

<!-- sequentialStart()
 == sequentialWait starts ==
starting slow promise
slow promise is done
slow
starting fast promise
fast promise is done
fast
== sequentialWait done == -->

async function sequentialWait() {
  console.log("== sequentialWait starts ==");

  // 1. Start two timers without waiting for each other
  const slow = resolveAfter2Seconds();
  const fast = resolveAfter1Second();

  // 2. Wait for the slow timer to complete, and then log the result
  console.log(await slow);
  // 3. Wait for the fast timer to complete, and then log the result
  console.log(await fast);

  console.log("== sequentialWait done ==");
}

<!-- sequentialWait()
 == sequentialWait starts ==
starting slow promise
starting fast promise
fast promise is done
slow promise is done
slow
fast
== sequentialWait done == -->


async function concurrent1() {
  console.log("== concurrent1 starts ==");

  // 1. Start two timers concurrently and wait for both to complete
  const results = await Promise.all([
    resolveAfter2Seconds(),
    resolveAfter1Second(),
  ]);
  // 2. Log the results together
  console.log(results[0]);
  console.log(results[1]);

  console.log("== concurrent1 done ==");
}

<!-- concurrent1()
 == sequentialWait starts ==
starting slow promise
starting fast promise
fast promise is done
slow promise is done
slow
fast
== sequentialWait done == -->

async function concurrent2() {
  console.log("== concurrent2 starts ==");

  // 1. Start two timers concurrently, log immediately after each one is done
  await Promise.all([
    (async () => console.log(await resolveAfter2Seconds()))(),
    (async () => console.log(await resolveAfter1Second()))(),
  ]);
  console.log("== concurrent2 done ==");
}

<!-- concurrent2()
 == sequentialWait starts ==
starting slow promise
starting fast promise
fast promise is done
fast
slow promise is done
slow
== sequentialWait done == -->

<!-- 
Why "fast promise is done" Before "slow promise is done"?
This is because both promises start executing simultaneously right when they are initiated, due to JavaScript's non-blocking, asynchronous nature.
The "fast" promise completes its operation in 1 second, whereas the "slow" promise takes 5 seconds to complete. Despite being awaited in sequence (which affects when their results are logged), their completion ("done" logging) reflects their individual durations, not the order in which their results are awaited and logged.
 -->

sequentialStart(); // after 2 seconds, logs "slow", then after 1 more second, "fast"


// wait above to finish
setTimeout(sequentialWait, 4000); // after 2 seconds, logs "slow" and then "fast"


// wait again
setTimeout(concurrent1, 7000); // same as sequentialWait


// wait again
setTimeout(concurrent2, 10000); // after 1 second, logs "fast", then after 1 more second, "slow"
