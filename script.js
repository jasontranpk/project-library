// let myLibrary = [];
const gallery = document.getElementsByClassName('gallery');
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}
function addBookToLibrary(book) {
  myLibrary.push(book);
}
class Library {
  myLibrary = [];
  constructor() {
    this.myLibrary = [];
  }
  addBookToLibrary(book) {
    this.myLibrary.push(book);
  }
  loadLibrary() {
    gallery[0].innerHTML = '';
    (this.myLibrary).forEach((book, index) => {
      //alert(book.title);
      const bookDiv = document.createElement("div");
      bookDiv.className = "book";
      const title = document.createElement("h3");
      const author = document.createElement("p");
      const pages = document.createElement("p");
      const read = document.createElement("p");
      read.style.display = 'inline';
      const removeBtn = document.createElement("input");
      removeBtn.value = 'x';
      removeBtn.type = 'button';
      removeBtn.className = 'removeBtn';
      removeBtn.setAttribute('data-bookId', index)
      title.textContent = book.title;
      author.textContent = book.author;
      pages.textContent = book.pages;
      const readCheck = document.createElement('input');
      readCheck.type = 'checkbox';
      readCheck.setAttribute('data-bookId', index)
      readCheck.className = 'readBtn';
      if (book.read) {
        readCheck.checked = true;
      }
      else {
        readCheck.checked = false;
      }
      read.textContent = book.read ? 'Read' : 'Not Read';
      bookDiv.appendChild(title);
      bookDiv.appendChild(author);
      bookDiv.appendChild(pages);
      bookDiv.appendChild(readCheck);
      bookDiv.appendChild(read);
      bookDiv.appendChild(removeBtn);
      gallery[0].appendChild(bookDiv);
    });
    this.addEventRemoveBook();
    this.addEventReadBook();
  }
  addEventRemoveBook() {
    const removeBtns = Array.from(document.getElementsByClassName('removeBtn'));
    removeBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        //alert(e.target.getAttribute('data-bookId'));
        let bookId = e.target.getAttribute('data-bookId');
        this.myLibrary.splice(bookId, 1);
        this.loadLibrary();
      })
    })
  }
  addEventReadBook() {
    const readBtns = Array.from(document.getElementsByClassName('readBtn'));
    readBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        // alert(e.target.getAttribute('data-bookId'));
        let bookId = e.target.getAttribute('data-bookId');
        if (this.myLibrary[bookId].read)
          this.myLibrary[bookId].read = false;
        else
          this.myLibrary[bookId].read = true;
        this.loadLibrary();
      })
    })
  }

}
let harryPorter1 = new Book('Harry Porter Vol 1', 'J.K Rowling', 1200, true)
let lordOfTheRings = new Book('Lord Of The Rings', 'J. R. R. Tolkien', 1300, false)
let theKiteRunner = new Book('The Kite Runner', 'Khaled Hosseini', 510, false)
let toKillAMockingbird = new Book('To Kill a Mockingbird', 'Kurt Vonnegut', 700, false)
let slaughterHouse = new Book('Slaughterhouse-Five', 'J. R. R. Tolkien', 750, false)
let library1 = new Library();
library1.addBookToLibrary(harryPorter1);
library1.addBookToLibrary(lordOfTheRings);
library1.addBookToLibrary(theKiteRunner);
library1.addBookToLibrary(toKillAMockingbird);
library1.addBookToLibrary(slaughterHouse);


library1.loadLibrary();

/*MODAL*/
const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
/*MODAL*/
const submitBtn = document.getElementById('submit');

submitBtn.onclick = () => {
  title = document.getElementById('title');
  author = document.getElementById('author');
  pages = document.getElementById('pages');
  read = document.getElementById('read');
  bookTemp = new Book(title.value, author.value, pages.value, read.value);
  console.log(bookTemp);
  library1.addBookToLibrary(bookTemp);
  library1.loadLibrary();
}