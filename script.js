const addBookBtn = document.querySelector(".add-book");
const form = document.querySelector("#form-popup");
const closeFormBtn = document.querySelector(".close");
const blurBg = document.querySelector(".blur");
const bookList = document.querySelector("#book-list");

const titleText = document.getElementById("title");
const titleError = document.querySelector(".title-error");

addBookBtn.addEventListener("click", () => {
  form.style.display = "";
  toggleBlurBg();
  const titleField = document.querySelector("#title");
  titleField.focus();
});

closeFormBtn.addEventListener("click", () => {
  document.querySelector("form").reset();
  form.style.display = "none";
  toggleBlurBg();
});

let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  changeReadStatus() {
    if (this.read === "read") {
      this.read = "unread";
    } else {
      this.read = "read";
    }
  }
}

function addBookToLibrary() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const checkbox = document.querySelector("#read");
  const read = checkbox.checked ? "read" : "unread";

  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  clearForm();
  document.querySelector("#form-popup").style.display = "none";
  displayBooks();
}

function displayBooks() {
  const list = document.querySelector("#book-list");
  list.textContent = "";

  for (let i = 0; i < myLibrary.length; i++) {
    const row = document.createElement("tr");

    if (myLibrary[i].read === "read") {
      row.innerHTML = `
    <td>${myLibrary[i].title}</td>
    <td>${myLibrary[i].author}</td>
    <td>${myLibrary[i].pages}</td>
    <td class='icon'><i class='fa-solid fa-toggle-on status-icon status-read}'></i></td>
    <td class='icon'><i class='fa-solid fa-trash-can'></i></td>`;
    } else if (myLibrary[i].read === "unread") {
      row.innerHTML = `
    <td>${myLibrary[i].title}</td>
    <td>${myLibrary[i].author}</td>
    <td>${myLibrary[i].pages}</td>
    <td class='icon'><i class='fa-solid fa-toggle-off status-icon status-unread}'></i></td>
    <td class='icon'><i class='fa-solid fa-trash-can'></i></td>`;
    }

    row.dataset.index = i;
    list.appendChild(row);
  }
}

titleText.addEventListener("focusout", (e) => {
  if (titleText.validity.valid) {
    titleError.textContent = "";
  } else {
    showError();
  }
});

titleText.addEventListener("focus", (e) => {
  titleError.textContent = "";
  titleError.style.display = "block";
});

document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!titleText.validity.valid) {
    showError();
  } else {
    addBookToLibrary();
    toggleBlurBg();
  }
});

function showError() {
  if (titleText.validity.valueMissing) {
    titleError.textContent = "You should enter the title";
  } else if (titleText.validity.tooShort) {
    titleError.textContent = "Title should contain at least 2 characters";
  }

  titleError.style.display = "block";
}

function clearForm() {
  document.getElementById("form").reset();
}

function removeBook(el) {
  let indexOfRemovedBook = el.parentElement.parentElement.dataset.index;
  //remove the book's row from the table
  el.parentElement.parentElement.remove();
  //remove the book from myLibrary array
  myLibrary.splice(indexOfRemovedBook, 1);
  //refresh the array with updated dataset.index
  displayBooks();
}

bookList.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash-can")) {
    removeBook(e.target);
  } else if (e.target.classList.contains("status-icon")) {
    let indexOfBookStatusChanged =
      e.target.parentElement.parentElement.dataset.index;
    //change read status in MyLibrary array
    myLibrary[indexOfBookStatusChanged].changeReadStatus();
    //change read status button display on the table
    if (e.target.classList.contains("status-read")) {
      e.target.classList.replace("status-read", "status-unread");
      e.target.classList.remove("fa-toggle-on");
      e.target.classList.add("fa-toggle-off");
    } else {
      e.target.classList.replace("status-unread", "status-read");
      e.target.classList.remove("fa-toggle-off");
      e.target.classList.add("fa-toggle-on");
    }
    displayBooks();
  }
});

function toggleBlurBg() {
  if (blurBg.style.filter == "") {
    blurBg.style.filter = "blur(2px)";
  } else {
    blurBg.style.filter = "";
  }
}
