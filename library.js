// Array to store all books in the library
const myLibrary = [];

// object constructor to hold relevant data for each book
// function Book(title, author, pages, isRead) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.isRead = isRead;
//     this.info = function () {
//         return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead ? "read" : "not read yet"}`;
//     }
// }
// // prototype function to toggle read status
// Book.prototype.toggleread = function () {
//     this.isRead = !this.isRead;
// }

// Class constructor to hold revelant data for each book
class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
    // class function per instance to toggle read status
    toggleread() {
        this.isRead = !this.isRead;
    }

}

// Test Data for array
var testBook = new Book("Hobbit", "Unknown Author", 52, false);
myLibrary.push(testBook);
var testBook = new Book("Bone", "Unknown Author", 521, true);
myLibrary.push(testBook);
var testBook = new Book("Diary of a wimpy kid", "Unknown Author", 122, true);
myLibrary.push(testBook);
var testBook = new Book("Book", "Unknown Author", 52, false);
myLibrary.push(testBook);

// Function to create a new book DOM and display to html
function displayBookToLibrary() {
    // fetches the books container and clears
    let bookContainer = document.querySelector(".books");
    bookContainer.innerHTML = "";

    // iterates over each book in the array and creates html structure for a "card"
    for (let index = 0; index < myLibrary.length; index++) {
        let book = document.createElement("div");
        book.setAttribute("data-index", index);
        book.classList.add("book");

        var bookDetails = "";
        bookDetails += `<p><span>${myLibrary[index].title}</span> by ${myLibrary[index].author}</p>`;
        bookDetails += `<div><p>${myLibrary[index].pages} pages</p><p class="read-${index}">${myLibrary[index].isRead ? "Read" : "Not Read"}</p></div>`;
        bookDetails += `<div><input type="button" value="Delete" class="deletebtn" data-index="${index}"><input type="button" value="Read" class="readbtn" data-index="${index}"></div>`;
        book.innerHTML = bookDetails;
        // appends book element to books container
        bookContainer.appendChild(book);
    }
    // subscribe events to all delete and read buttons
    var deleteBtns = document.querySelectorAll(".deletebtn");
    var readBtns = document.querySelectorAll(".readbtn");
    deleteBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            deleteBookFromLibrary(btn.dataset.index);
        });
    });
    readBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // uses the index dataset to toggle the read status on the book
            myLibrary[btn.dataset.index].toggleread();
            // grabs the text element and replaces the text based on the new read status
            document.querySelector(`.read-${btn.dataset.index}`).innerHTML = myLibrary[btn.dataset.index].isRead ? "Read" : "Not Read"
        });
    });
}

// Function to add a new book to book array from user
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBookToLibrary();
}
// function to delete a book from the array using specified index
function deleteBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    displayBookToLibrary();
}

// used to display books in array to html
displayBookToLibrary();

// clears the data in the dialog
function clearDialog() {
    document.getElementById("title").value = '';
    document.getElementById("author").value = '';
    document.getElementById("pages").value = '';
    document.getElementById("isread").checked = false;
}

let dialog = document.getElementById("book-dialog");
// opens the dialog
function openDialog() {
    dialog.showModal();
}
// clears the data in the dialog and closes after
function closeDialog() {
    clearDialog();
    dialog.close();
}

// creates an event listener for the addbook button in the dialog to submit user provided
//  data to the library and closes the dialog
let addBook = document.getElementById("addBook");
addBook.addEventListener('click', (event) => {
    event.preventDefault();
    let bookTitle = document.getElementById("title").value;
    let bookAuthor = document.getElementById("author").value;
    let bookPages = +document.getElementById("pages").value;
    let bookRead = document.getElementById("isread").checked;

    addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead);
    closeDialog();
});
