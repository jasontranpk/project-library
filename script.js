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
let harryPorter1 = new Book('Harry Porter Vol 1', 'J.K Rowling', 1200, true)
let lordOfTheRings = new Book('Lord Of The Rings', 'J. R. R. Tolkien', 1300, false)
let theKiteRunner = new Book('The Kite Runner', 'Khaled Hosseini', 510, false)
let toKillAMockingbird = new Book('To Kill a Mockingbird', 'Kurt Vonnegut', 700, false)
let slaughterHouse = new Book('Slaughterhouse-Five', 'J. R. R. Tolkien', 750, false)
addBookToLibrary(harryPorter1);
addBookToLibrary(lordOfTheRings);
addBookToLibrary(theKiteRunner);
addBookToLibrary(toKillAMockingbird);
addBookToLibrary(slaughterHouse);

const gallery = document.getElementsByClassName('gallery');
(myLibrary).forEach(book => {
    //alert(book.title);
    const bookDiv = document.createElement("div");
    bookDiv.className = "book";
    const title = document.createElement("h3");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const read = document.createElement("p");
    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    read.textContent = book.read?'Read':'Not Read';
    bookDiv.appendChild(title);
    bookDiv.appendChild(author);
    bookDiv.appendChild(pages);
    bookDiv.appendChild(read);
    gallery[0].appendChild(bookDiv);

});


// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}