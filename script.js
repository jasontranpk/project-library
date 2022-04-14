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
let lordOfTheRings = new Book('Lord Of The Rings', 'J. R. R. Tolkien', 1200, false)
addBookToLibrary(harryPorter1);
addBookToLibrary(lordOfTheRings);
const container = document.getElementById('container');
(myLibrary).forEach(book => {
    //alert(book.title);
    const para = document.createElement("p");
    para.textContent = book.title;
    container.appendChild(para);
});