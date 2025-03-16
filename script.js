let library = [];

class Book {
  constructor(book) {
    this.id = crypto.randomUUID();
    this.title = book.title;
    this.author = book.author;
    this.pages = book.pages;
    this.isRead = book.isRead;
  }

  toggleReadStatus() {
    this.isRead = !this.isRead;
  }
}

function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book({ title, author, pages, isRead });
  library.push(book);
}

function toggleBookFromLibrary(id) {
  const book = library.find(book => book.id === id);
  if (!book) throw Error("Invalid book id!");
  book.toggleReadStatus();
  console.log(library);
}

function removeBookFromLibrary(id) {
  const initialLength = library.length;
  library = library.filter(book => book.id !== id);
  if (library.length === initialLength) throw Error("Invalid book id!");
}

function createBookElement(book) {
  const container = document.querySelector(".container");

  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book");
  bookDiv.dataset.id = book.id;
  
  const bookTitle = document.createElement("div");
  bookTitle.classList.add("book-title");
  bookTitle.textContent = book.title;

  const bookAuthor = document.createElement("div");
  bookAuthor.classList.add("book-author");
  bookAuthor.textContent = book.author;

  const bookPages = document.createElement("div");
  bookPages.classList.add("book-pages");
  bookPages.textContent = book.pages + ' pages';

  const bookReadStatus = document.createElement("div");
  bookReadStatus.classList.add("book-read-status");
  bookReadStatus.textContent = book.isRead ? "Read" : "Unread";

  const bookButtonGroup = document.createElement("div");
  bookButtonGroup.classList.add("book-button-group");

  const bookToggleStatusButton = document.createElement("button");
  bookToggleStatusButton.textContent = book.isRead ? "Mark as unread" : "Mark as read";
  bookToggleStatusButton.addEventListener("click", () => {
    toggleBookFromLibrary(book.id);
    bookReadStatus.textContent = book.isRead ? "Read" : "Unread";
    bookToggleStatusButton.textContent = book.isRead ? "Mark as unread" : "Mark as read";
  });

  const bookRemoveButton = document.createElement("button");
  bookRemoveButton.textContent = "Remove";
  bookRemoveButton.addEventListener("click", () => {
    removeBookFromLibrary(book.id);
    bookDiv.remove();
  });
  
  container.appendChild(bookDiv);
  bookDiv.appendChild(bookTitle);
  bookDiv.appendChild(bookAuthor);
  bookDiv.appendChild(bookPages);
  bookDiv.appendChild(bookReadStatus);
  bookDiv.appendChild(bookButtonGroup);
  bookButtonGroup.appendChild(bookToggleStatusButton);
  bookButtonGroup.appendChild(bookRemoveButton);
}

(() => {
  const addBookButton = document.querySelector("#addBookModalBtn");
  const modal = document.getElementById('addBookModal');
  const form = document.querySelector('form');
  const closeModalButton = document.getElementById('closeModalBtn');
  const submitModalButton = document.getElementById('submitModalBtn');
  const elements = modal.querySelectorAll("input");

  addBookButton.addEventListener("click", () => modal.showModal());

  submitModalButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = [];
    elements.forEach((element) => (element.type === "checkbox") ? data.push(element.checked) : data.push(element.value));

    addBookToLibrary(...data);
    createBookElement(library[library.length - 1]);
    modal.close();
    form.reset();
  });


  closeModalButton.addEventListener("click", () => modal.close());
})();