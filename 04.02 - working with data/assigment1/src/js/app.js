import { contacts } from "../data/contacts.js";

const searchBtnEl = document.querySelector("[search-btn]");
const inputEl = document.querySelector("[text-input]");
const inputErrorEl = document.querySelector("[input-error]");
const contactListEl = document.querySelector("[contact-list]");
const resultDivEl = document.querySelector("[result-list]");
const contactDivEl = document.querySelector("[contact]");

// events
searchBtnEl.addEventListener("click", makeSearch);
inputEl.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    makeSearch();
  }
});

// functions
function makeSearch() {
  const checkInputResult = checkInput();

  if (checkInputResult === "error") return;

  let searchResult = [];

  if (checkInputResult === "str") {
    searchResult = searchByName(contacts.results, inputEl.value);
  }

  if (checkInputResult === "num") {
    searchResult = searchByPhone(contacts.results, inputEl.value);
  }

  displayContactList(searchResult);

  return;
}

function displayContactList(contactsArr) {
  contactListEl.innerHTML = "";
  resultDivEl.classList.remove("hidden");

  contactDivEl.innerHTML = "";

  if (contactsArr.length == 0) {
    const liEl = document.createElement("li");
    liEl.textContent = "0 Contacts Found";
    contactListEl.appendChild(liEl);
    return;
  }

  contactsArr.forEach((item) => {
    let liEl = document.createElement("li");
    let dataId = item.login.uuid;
    liEl.textContent = `${item.name.last} ${item.name.first}`;
    liEl.setAttribute("data-id", dataId);
    liEl.addEventListener("click", (event) => {
      const uuid = event.target.getAttribute("data-id");
      let liElSelected = document.getElementsByClassName("selected")[0];
      if (!!liElSelected) {
        liElSelected.classList.remove("selected");
      }
      liEl.classList.add("selected");
      displayContact(uuid);
    });
    contactListEl.appendChild(liEl);
    contactListEl.firstChild.classList.add("selected");
    const id = contactListEl.firstChild.getAttribute("data-id");
    displayContact(id);
  });
}

function displayContact(id) {
  let contactInfo = contacts.results.find((item) => item.login.uuid === id);
  let contactDiv = `
        <div class="img">
            <img src="${contactInfo.picture.large}" alt="" class="img-rounded">
        </div>
        <div class="fio">${contactInfo.name.title} ${contactInfo.name.last} ${contactInfo.name.first}</div>
        <div class="contact">
            <p>Country: <span>${contactInfo.location.country}</span></p>
            <p>E-mail: <span>${contactInfo.email}</span></p>
        </div>
        `;
  contactDivEl.innerHTML = contactDiv;
}

function checkInput() {
  const inputVal = inputEl.value;
  const inputLength = inputVal.length;

  if (inputLength < 3) {
    inputErrorEl.textContent = "Input at least 3 symbols: letters or digits";
    inputErrorEl.classList.remove("hidden");
    inputEl.classList.add("error");
    return "error";
  }

  inputEl.classList.add("ok");
  inputErrorEl.classList.add("hidden");

  const numRegex = /[\d]+/;
  if (!isNaN(inputVal) && inputVal.match(numRegex)[0].length === inputLength) {
    return "num";
  }

  return "str";
}

function searchByPhone(contactsArr, phoneNum) {
  const regEx = /\d+/g;
  return contactsArr.filter((item) =>
    item.phone.match(regEx).join("").includes(phoneNum)
  );
}

function searchByName(contactsArr, str) {
  let strLowerCase = str.toLowerCase();
  return contactsArr.filter(
    (item) =>
      item.name.first.toLowerCase().includes(strLowerCase) ||
      item.name.last.toLowerCase().includes(strLowerCase)
  );
}
