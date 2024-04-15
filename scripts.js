const button = document.querySelector("button");
const cards = document.querySelector("#cards");
const addDialog = document.getElementById("addDialog");
const confirmBtn = document.getElementById("confirmBtn");
const form = document.querySelector("form");

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const haveRead = document.getElementById("haveRead");

button.addEventListener("click", function() {
  addDialog.showModal();
});

confirmBtn.addEventListener("click", function(event) {
  event.preventDefault();
  addBooktoLibrary(title.value, author.value, pages.value, haveRead.value);
  showBooks();
  addDialog.close();
});

const myLibrary = [];

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${haveRead}.`
  };
}

function addBooktoLibrary(title, author, pages, haveRead) {
  let book = new Book(title, author, pages, haveRead);
  myLibrary.push(book);
  return myLibrary;
}

addBooktoLibrary(
	'A Game of Thrones',
	'George R. R. Martin',
	694,
	'I have read'
);

addBooktoLibrary(
  'The Hobbit',
  'J.R.R. Tolkien',
  304,
  'I have not read'
);

function showBooks() {
  cards.innerHTML = "";
  for(let i = 0; i < myLibrary.length; i++) {
    const card = document.createElement("div");
    card.id = "card";
    card.textContent = myLibrary[i].info();
    cards.appendChild(card);
  }
}

showBooks();