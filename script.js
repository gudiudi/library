let library = [];

function Book(title, author, pages, isRead) {
  if (!new.target) throw Error("You must use the 'new' operator to call the constructor");

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleReadStatus = function() {
  this.isRead = !this.isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead);
  library.push(book);
}

function toggleBookFromLibrary(id) {
  const book = library.find(book => book.id === id);
  if (!book) throw Error("Invalid book id!");
  book.toggleReadStatus();
}

function removeBookFromLibrary(id) {
  const initialLength = library.length;
  library = library.filter(book => book.id !== id);
  if (library.length === initialLength) throw Error("Invalid book id!");
}

function createBookElement(book) {
  const container = document.querySelector(".container");

  const div = document.createElement("div");
  div.classList.add("book");
  
  const bookTitle = document.createElement("div");
  bookTitle.classList.add("book-title");
  bookTitle.textContent = book.title;

  const bookAuthor = document.createElement("div");
  bookAuthor.classList.add("book-author");
  bookAuthor.textContent = book.author;

  const bookPages = document.createElement("div");
  bookPages.classList.add("book-pages");
  bookPages.textContent = book.pages;

  const bookReadStatus = document.createElement("div");
  bookReadStatus.classList.add("book-read-status");
  bookReadStatus.textContent = book.isRead ? "Read" : "Not read";
  
  container.appendChild(div);
  div.appendChild(bookTitle);
  div.appendChild(bookAuthor);
  div.appendChild(bookPages);
  div.appendChild(bookReadStatus);
}

(() => {
  const addBookButton = document.querySelector("button");
  
  addBookButton.addEventListener("click", (e) => {
    const title = "To Kill a Mockingbird";
    const author = "Harper Lee";
    const pages = 281;
    const isRead = true;

    addBookToLibrary(title, author, pages, isRead);
    createBookElement(library[library.length - 1]);
  });
})();