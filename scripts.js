const button = document.querySelector("button");
const cards = document.querySelector("#cards");
const addDialog = document.getElementById("addDialog");
const confirmBtn = document.getElementById("confirmBtn");
const form = document.querySelector("form");

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const haveRead = document.getElementById("haveRead");
const haveNotRead = document.getElementById('haveNotRead');

button.addEventListener("click", function() {
  addDialog.showModal();
});

confirmBtn.addEventListener("click", function(event) {
  event.preventDefault();
  let readStatus;
  if (haveRead.checked) {
		readStatus = 'I have read';
  } else {
		readStatus = 'I have not read';
  }
  addBooktoLibrary(title.value, author.value, pages.value, readStatus);
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
  this.toggleRead = function () {
		this.haveRead =
			this.haveRead === 'I have read' ? 'I have not read' : 'I have read';
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

//Add a remove button to each book card
cards.addEventListener("click", (event) => {
  if (event.target.classList.contains("removeBtn")) {
    const index = event.target.dataset.index;
    myLibrary.splice(index, 1);
    showBooks();
  }
});

function toggleReadStatus(event) {
	const index = event.target.dataset.index;
	myLibrary[index].toggleRead();
	event.target.checked = myLibrary[index].haveRead === 'I have read';
	showBooks();
}

function showBooks() {
  cards.innerHTML = "";
  for(let i = 0; i < myLibrary.length; i++) {
    const card = document.createElement("div");
    card.id = "card";
    card.textContent = myLibrary[i].info();
    card.classList.toggle("unread", myLibrary[i].haveRead === "I have not read");

    const readSlider = document.createElement("label");
    readSlider.classList.add('read-slider', 'switch');

    const readInput = document.createElement("input");
    readInput.type = "checkbox";
    readInput.checked = myLibrary[i].haveRead === "I have read";
    readInput.dataset.index = i;
    readInput.addEventListener("change", toggleReadStatus);
    
    const readSpan = document.createElement('span');
  	readSpan.classList.add('slider', 'round');

    readSlider.appendChild(readInput);
    readSlider.appendChild(readSpan);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.classList.add("remove-btn");
    removeBtn.dataset.index = i;
    removeBtn.addEventListener('click', () => {
      myLibrary.splice(i, 1);
      showBooks();
    });

    card.appendChild(removeBtn);
    card.appendChild(readSlider);
    cards.appendChild(card);
  }
}

showBooks();