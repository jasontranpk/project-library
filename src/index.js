import './style.css';
import SetUpData from './SetUpData';
import {
	doc,
	setDoc,
	collection,
	getDocs,
	deleteDoc,
} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore/lite';
import app from './app';

SetUpData();

const db = getFirestore(app);

let myLibrary = [];

function Book(title, author, pages, read, id) {
	this.id = id;
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

const querySnapshot = await getDocs(collection(db, 'myLibrary'));
const queryArr = [];
querySnapshot.forEach((doc) => {
	// doc.data() is never undefined for query doc snapshots
	console.log(doc.id, ' => ', doc.data());
	let data = doc.data();
	console.log(data);
	let book = new Book(
		data.title,
		data.author,
		data.pages,
		data.read,
		data.id
	);
	addBookToLibrary(book);
});
console.log(queryArr);
function addBookToLibrary(book) {
	myLibrary.push(book);
}
/* let harryPorter1 = new Book('Harry Porter Vol 1', 'J.K Rowling', 1200, true);
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
addBookToLibrary(slaughterHouse); */
const gallery = document.querySelector('.gallery');
function loadLibrary() {
	gallery.innerHTML = '';
	myLibrary.forEach((book, index) => {
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
		removeBtn.setAttribute('data-bookId', book.id);
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
	const id = 'B' + (myLibrary.length + 1);
	if (addForm.checkValidity()) {
		const bookTemp = new Book(
			title.value,
			author.value,
			pages.value,
			read.value,
			id
		);
		addBookToLibrary(bookTemp);
		addBookFirebase(bookTemp);
		loadLibrary();
		modal.style.display = 'none';
	}
};
async function addBookFirebase(book) {
	await setDoc(doc(db, 'myLibrary', book.id), {
		title: book.title,
		author: book.author,
		pages: book.pages,
		read: book.read,
		id: book.id,
	});
}
async function deleteBookFirebase(bookId) {
	console.log(bookId);
	await deleteDoc(doc(db, 'myLibrary', bookId));
}
//Add event listener to each remove button
function addEventRemoveBook() {
	const removeBtns = Array.from(document.getElementsByClassName('removeBtn'));
	removeBtns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			//alert(e.target.getAttribute('data-bookId'));
			let bookId = e.target.getAttribute('data-bookId');
			const index = myLibrary.findIndex((book) => book.id === bookId);
			myLibrary.splice(index, 1);
			deleteBookFirebase(bookId);
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
