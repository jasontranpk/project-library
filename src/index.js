import './style.css';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyACs4Qq9s-y0gx92wMrifyIzVPfsvMkNa8',
	authDomain: 'small-projects-f3743.firebaseapp.com',
	projectId: 'small-projects-f3743',
	storageBucket: 'small-projects-f3743.appspot.com',
	messagingSenderId: '639093176179',
	appId: '1:639093176179:web:e2975c162c2d4843c67706',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}
function addBookToLibrary(book) {
	myLibrary.push(book);
}
let harryPorter1 = new Book('Harry Porter Vol 1', 'J.K Rowling', 1200, true);
let lordOfTheRings = new Book(
	'Lord Of The Rings',
	'J. R. R. Tolkien',
	1300,
	false
);
let theKiteRunner = new Book('The Kite Runner', 'Khaled Hosseini', 510, false);
let toKillAMockingbird = new Book(
	'To Kill a Mockingbird',
	'Kurt Vonnegut',
	700,
	false
);
let slaughterHouse = new Book(
	'Slaughterhouse-Five',
	'J. R. R. Tolkien',
	750,
	false
);
addBookToLibrary(harryPorter1);
addBookToLibrary(lordOfTheRings);
addBookToLibrary(theKiteRunner);
addBookToLibrary(toKillAMockingbird);
addBookToLibrary(slaughterHouse);

const gallery = document.querySelector('.gallery');
console.log(gallery);

function loadLibrary() {
	gallery.innerHTML = '';
	myLibrary.forEach((book, index) => {
		//alert(book.title);
		const bookDiv = document.createElement('div');
		bookDiv.className = 'book';
		const title = document.createElement('h3');
		const author = document.createElement('p');
		const pages = document.createElement('p');
		const read = document.createElement('p');
		read.style.display = 'inline';
		const removeBtn = document.createElement('input');
		removeBtn.value = 'x';
		removeBtn.type = 'button';
		removeBtn.className = 'removeBtn';
		removeBtn.setAttribute('data-bookId', index);
		title.textContent = book.title;
		author.textContent = book.author;
		pages.textContent = book.pages;
		const readCheck = document.createElement('input');
		readCheck.type = 'checkbox';
		readCheck.setAttribute('data-bookId', index);
		readCheck.className = 'readBtn';
		if (book.read) {
			readCheck.checked = true;
		} else {
			readCheck.checked = false;
		}
		read.textContent = book.read ? 'Read' : 'Not Read';
		bookDiv.appendChild(title);
		bookDiv.appendChild(author);
		bookDiv.appendChild(pages);
		bookDiv.appendChild(readCheck);
		bookDiv.appendChild(read);
		bookDiv.appendChild(removeBtn);
		gallery.appendChild(bookDiv);
	});
	addEventRemoveBook();
	addEventReadBook();
}

loadLibrary();

/*MODAL*/
const modal = document.getElementById('myModal');
const btn = document.getElementById('myBtn');
const span = document.getElementsByClassName('close')[0];

btn.onclick = function () {
	modal.style.display = 'block';
};

span.onclick = function () {
	modal.style.display = 'none';
};

window.onclick = (event) => {
	if (event.target == modal) {
		modal.style.display = 'none';
	}
};
/*MODAL*/
const submitBtn = document.getElementById('submit');

submitBtn.onclick = (e) => {
	e.preventDefault();
	const title = document.getElementById('title');
	const author = document.getElementById('author');
	const pages = document.getElementById('pages');
	const read = document.getElementById('read');
	const addForm = document.getElementById('add-form');
	title.addEventListener('input', (e) => {
		title.checkValidity();
		title.reportValidity();
	});
	author.addEventListener('input', (e) => {
		author.checkValidity();
		author.reportValidity();
	});
	pages.addEventListener('input', (e) => {
		pages.checkValidity();
		pages.reportValidity();
	});
	addForm.checkValidity();
	addForm.reportValidity();
	if (addForm.checkValidity()) {
		const bookTemp = new Book(
			title.value,
			author.value,
			pages.value,
			read.value
		);
		console.log(bookTemp);
		addBookToLibrary(bookTemp);
		loadLibrary();
		modal.style.display = 'none';
	}
};
//Add event listener to each remove button
function addEventRemoveBook() {
	const removeBtns = Array.from(document.getElementsByClassName('removeBtn'));
	removeBtns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			//alert(e.target.getAttribute('data-bookId'));
			let bookId = e.target.getAttribute('data-bookId');
			myLibrary.splice(bookId, 1);
			loadLibrary();
		});
	});
}
function addEventReadBook() {
	const readBtns = Array.from(document.getElementsByClassName('readBtn'));
	readBtns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			//alert(e.target.getAttribute('data-bookId'));
			let bookId = e.target.getAttribute('data-bookId');
			if (myLibrary[bookId].read) myLibrary[bookId].read = false;
			else myLibrary[bookId].read = true;
			loadLibrary();
		});
	});
}
