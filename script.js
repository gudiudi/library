let library = [];

function Book(title, author, year, pages, isRead) {
  if (!new.target) throw Error("You must use the 'new' operator to call the constructor");

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleReadStatus = function() {
  this.isRead = !this.isRead;
}

function addBookToLibrary(title, author, year, pages, isRead) {
  const book = new Book(title, author, year, pages, isRead);
  library.push(book);
}

addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 1960, 281, true);
addBookToLibrary("1984", "George Orwell", 1949, 328, false);

function toggleBookFromLibrary(id) {
  const book = library.find(book => book.id === id);
  if (!book) throw Error("Invalid book id!");
  book.toggleReadStatus();
}

toggleBookFromLibrary(library[0].id);
console.log(library);


function removeBookFromLibrary(id) {
  const initialLength = library.length;
  library = library.filter(book => book.id !== id);
  if (library.length === initialLength) throw Error("Invalid book id!");
}

removeBookFromLibrary(library[0].id);
console.log(library);