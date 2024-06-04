const button = document.querySelector('button');
const cards = document.querySelector('#cards');
const addDialog = document.getElementById('addDialog');
const confirmBtn = document.getElementById('confirmBtn');
const cancelBtn = document.getElementById('cancelBtn');
const form = document.querySelector('form');

const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const haveRead = document.getElementById('haveRead');
const haveNotRead = document.getElementById('haveNotRead');

button.addEventListener('click', function () {
	addDialog.showModal();
});

cancelBtn.addEventListener('click', function (event) {
	event.preventDefault();
	addDialog.close();
	form.reset();
});

confirmBtn.addEventListener('click', function (event) {
	event.preventDefault();
	if (validateForm()) {
		let readStatus = document.querySelector(
			'input[name="haveRead"]:checked'
		).value;
		let authorValue = author.value.trim() === '' ? 'Unknown' : author.value;
		addBooktoLibrary(title.value, authorValue, pages.value, readStatus);
		showBooks();
		addDialog.close();
		form.reset();
	}
});

const myLibrary = [];

class Book {
	constructor(title, author, pages, haveRead) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.haveRead = haveRead;
		this.info = function () {
			return `${this.title} by ${this.author}, ${this.pages} pages, ${this.haveRead}.`;
		};
		this.toggleRead = function () {
			this.haveRead =
				this.haveRead === 'I have read'
					? 'I have not read'
					: 'I have read';
		};
	}
}

function addBooktoLibrary(title, author, pages, haveRead) {
	let book = new Book(title, author, pages, haveRead);
	myLibrary.push(book);
	return myLibrary;
}

function validateTitle(title) {
	if (title.value.trim() === '' || title.value.length > 150) {
		title.style.border = '2px solid red';
		return false;
	} else {
		title.style.border = '';
		return true;
	}
}

function validatePages(pages) {
	if (pages.value < 1 || pages.value > 22000) {
		pages.style.border = '2px solid red';
		return false;
	} else {
		pages.style.border = '';
		return true;
	}
}

function validateReadStatus(haveRead, haveNotRead) {
	if (!haveRead.checked && !haveNotRead.checked) {
		haveRead.style.outline = '2px solid red';
		haveNotRead.style.outline = '2px solid red';
		return false;
	} else {
		haveRead.style.outline = '';
		haveNotRead.style.outline = '';
		return true;
	}
}

function validateForm() {
	let valid = true;

	if (!validateTitle(title)) valid = false;
	if (!validatePages(pages)) valid = false;
	if (!validateReadStatus(haveRead, haveNotRead)) valid = false;

	return valid;
}

title.addEventListener('input', () => {
	validateTitle(title);
});

pages.addEventListener('input', () => {
	validatePages(pages);
});

haveRead.addEventListener('change', () => {
	validateReadStatus(haveRead, haveNotRead);
});

haveNotRead.addEventListener('change', () => {
	validateReadStatus(haveRead, haveNotRead);
});

addBooktoLibrary(
	'A Game of Thrones',
	'George R. R. Martin',
	694,
	'I have read'
);

addBooktoLibrary('The Hobbit', 'J.R.R. Tolkien', 304, 'I have not read');

//Add a remove button to each book card
cards.addEventListener('click', (event) => {
	if (event.target.classList.contains('removeBtn')) {
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
	cards.innerHTML = '';
	for (let i = 0; i < myLibrary.length; i++) {
		const card = document.createElement('div');
		card.id = 'card';
		card.textContent = myLibrary[i].info();
		card.classList.add(
			myLibrary[i].haveRead === 'I have read' ? 'read' : 'unread'
		);

		const readSlider = document.createElement('label');
		readSlider.classList.add('read-slider', 'switch');

		const readInput = document.createElement('input');
		readInput.type = 'checkbox';
		readInput.checked = myLibrary[i].haveRead === 'I have read';
		readInput.dataset.index = i;
		readInput.addEventListener('change', toggleReadStatus);

		const readSpan = document.createElement('span');
		readSpan.classList.add('slider', 'round');

		readSlider.appendChild(readInput);
		readSlider.appendChild(readSpan);

		const removeBtn = document.createElement('button');
		removeBtn.textContent = 'X';
		removeBtn.classList.add('remove-btn');
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
