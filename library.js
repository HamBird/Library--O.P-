console.log("Help");

// Array to store all books in the library
const myLibrary = [];

// object constructor to hold relevant data for each book
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead ? "read" : "not read yet"}`;
    }
}

Book.prototype.read = function () {
    this.isRead = !this.isRead;
}

// var testBook = new Book("Hobbit", "Unknown Author", 52, false);
// myLibrary.push(testBook);

// Function to create a new book DOM and display to html
function displayBookToLibrary() {
    let bookContainer = document.querySelector(".books");
    bookContainer.innerHTML = "";

    for (let index = 0; index < myLibrary.length; index++) {
        let book = document.createElement("div");
        book.setAttribute("data-index", index);
        book.classList.add("book");

        var bookDetails = "";
        bookDetails += `<p><span>${myLibrary[index].title}</span> by ${myLibrary[index].author}</p>`;
        bookDetails += `<div><p>${myLibrary[index].pages} pages</p><p>${myLibrary[index].isRead ? "Read" : "Not Read"}</p></div>`;
        bookDetails += `<div><input type="button" value="Delete"><input type="button" value="Read"></div>`;
        book.innerHTML = bookDetails;
        bookContainer.appendChild(book);
    }
}

// Function to add a new book to book array from user
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBookToLibrary();
}

let addBook = document.getElementById("addBook");
addBook.addEventListener('click', () => {
    let bookTitle = document.getElementById("title").value;
    let bookAuthor = document.getElementById("author").value;
    let bookPages = document.getElementById("pages");
    let bookRead = document.getElementById("isread").checked;

    addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead);
});

let dialog = document.getElementById("book-dialog");
function openDialog() {
    dialog.showModal();
}
function closeDialog() {
    dialog.close();
}