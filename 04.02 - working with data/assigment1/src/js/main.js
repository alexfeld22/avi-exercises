import { contacts } from '../data/contacts.js';

//console.log(contacts.results);


// practice of shallow and deep copying of an object

// let person = {
//     name: 'Alex',
//     email: 'alex@alex.com',
//     address: {
//         city: 'Tel-Aviv',
//         street: 'Herzel',
//         house: 15,
//         flat: 1
//     },
//     logPersonName: function(){
//         console.log(this.name);
//     }
// }

// let person1 = {...person};

// person1.name = 'Alexey';
// person1.address.city = 'Haifa';
// person1.logPersonName = function(){
//     console.log('Hey, ' + this.name);
// }

// console.log(person);

// let person2 = JSON.parse(JSON.stringify(person));
// console.log(person2);

// let person3 = Object.assign({}, person);
// console.log(person3);

// person3.name = 'Alexander';
// person3.address.city = 'Eilat';
// person3.logPersonName = function(){
//     console.log('Hey-hey, ' + this.name);
// }


// # Array Order Methods 

// === task1 ===
// 1. Write a function that takes the array of contacts and returns a new array sorted by last name. 

const sortContactsByLastName = function(contactsArr){
    const contactsArrCopy = JSON.parse(JSON.stringify(contactsArr));
    contactsArrCopy.sort((a,b)=> a.name.last > b.name.last ? 1 : -1);
    return contactsArrCopy;
}

// sortContactsByLastName(contacts.results).forEach((el)=> console.log(el.name.last));



// === task 2 ===
// 2. Write a function to return the array of contacts in reverse order. Do not use the built-in reverse() method. 

const getReversedArr = function(arr){
    const reversedArr = [];
    const cnt = arr.length;
    for (let index = 0; index < arr.length; index++) {
        reversedArr.push(arr[cnt - index - 1]);
    };
    return reversedArr;
}

// getReversedArr(contacts.results).forEach((item) => console.log(item.email));



// task 3
// 3. Write a function that returns the first 5 contacts from the sorted list (by last name).

const returnTopNContactsByLastName = function(contactsArr, Num){
    return sortContactsByLastName(contactsArr).slice(0,Num);
}

// console.log(returnTopNContactsByLastName(contacts.results, 5));




// task 4
// 4. Create a function that returns an array of all unique first names. No duplicates should be present. 

const getUniqueFirstNamesFromContacts = function(contactsArr){
    const result = [];
    for (let item of contactsArr){
        let firstName = item.name.first;
        if (!result.includes(firstName)){
            result.push(firstName);
        }
    }
    return result;
}

// console.log(getUniqueFirstNamesFromContacts(contacts.results).toSorted());




// task 5
// 5. Write a function that concatenates the first and last name of each contact into a new array of full names.

const getFullNames = function(contactsArr){
    return contactsArr.map((item)=> `${item.name.first} ${item.name.last}`)
}

// console.log(getFullNames(contacts.results).toSorted());




// === Looping Through Arrays ===

// == task 1 ===
// 1. Write a loop that iterates through the array and logs each contact's email to the console. 
// contacts.results.forEach((item) => console.log(item.email));



// === task 2 ===
// 2. Write a function that takes an ID as a parameter and returns the contact with that ID.

const getContactById = function(contactsArr,{name, value}){
    return contactsArr.find((item)=> item.id.name === name && item.id.value === value) || -1;
}

// console.log(getContactById(contacts.results, contacts.results[50].id));
// console.log(getContactById(contacts.results, {name: 'xxxx', value: 'yyyyy'}));




// === task 3 ===
// 3. Create a function that counts how many contacts are from a specific country. The country should be a parameter of the function. 

const countContactsFromCountry = function (contactsArr, countryStr){
    return contactsArr.reduce((acc, item) => acc + (item.location.country === countryStr ? 1: 0) ,0)
}

// console.log(countContactsFromCountry(contacts.results,'Finland'));
// console.log(countContactsFromCountry(contacts.results,'Somali-land'));


// === task 4 ===
// 4. Write a function that returns a new array of contacts that are within a given age range, e.g., 25 to 35 years old.

const contactsBetweenAges = function(contactsArr, fromAgeNum, toAgeNum){
    return contactsArr.filter((item) => item.dob.age >= fromAgeNum && item.dob.age <= toAgeNum);
    }

// console.log(contactsBetweenAges(contacts.results, 40,45));
// console.log(contactsBetweenAges(contacts.results, 0,1));
