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

console.log(countContactsFromCountry(contacts.results,'Finland'));
console.log(countContactsFromCountry(contacts.results,'Somali-land'));
