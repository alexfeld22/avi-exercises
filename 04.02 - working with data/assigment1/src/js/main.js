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

// 1. Write a function that takes the array of contacts and returns a new array sorted by last name. 

const sortContactsByLastName = function(contactsArr){
    const contactsArrCopy = JSON.parse(JSON.stringify(contactsArr));
    contactsArrCopy.sort((a,b)=> a.name.last > b.name.last ? 1 : -1);
    return contactsArrCopy;
}

sortContactsByLastName(contacts.results).forEach((el)=> console.log(el.name.last));


// 