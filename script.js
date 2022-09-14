const addBookBtn = document.querySelector('.add-book');
const form = document.querySelector('#form-popup');
const closeFormBtn = document.querySelector('.close');
const blurBg = document.querySelector('.blur');

addBookBtn.addEventListener('click', () => {
  form.style.display = '';
  toggleBlurBg();
});

closeFormBtn.addEventListener('click', () => {
  form.style.display = 'none';
  toggleBlurBg();
});

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
};

function addBookToLibrary() {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').value;
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  clearForm();
  document.querySelector('#form-popup').style.display = 'none';
  displayBooks();
};

function displayBooks() {
  const list = document.querySelector('#book-list');
  list.textContent = '';

  for (let i = 0; i < myLibrary.length; i++) {

    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${myLibrary[i].title}</td>
    <td>${myLibrary[i].author}</td>
    <td>${myLibrary[i].pages}</td>
    <td><button class='status-btn btn'>${myLibrary[i].read}</button></td>
    <td><button class='remove-btn btn'>Remove</button></td>`;
    row.dataset.index = i;
    list.appendChild(row);
  }
};

document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();
  addBookToLibrary();
  toggleBlurBg();
});

function clearForm() {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#pages').value = '';
  document.querySelector('#read').value = 'Read';
};

function removeBook(el) {
  let indexOfRemovedBook = el.parentElement.parentElement.dataset.index;
  //remove the book's row from the table
  el.parentElement.parentElement.remove();
  //remove the book from myLibrary array
  myLibrary.splice(indexOfRemovedBook, 1);
  //refresh the array with updated dataset.index
  displayBooks();
};

document.querySelector('#book-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    removeBook(e.target);
  }
  else if (e.target.classList.contains('status-btn')) {
    let indexOfBookStatusChanged = e.target.parentElement.parentElement.dataset.index;
    //change read status in MyLibrary array
    myLibrary[indexOfBookStatusChanged].changeReadStatus();
    //change read status button display on the table
    if (e.target.textContent === 'Read') {
      e.target.textContent = 'Unread';
    } else {
      e.target.textContent = 'Read';
    };
  }
});

Book.prototype.changeReadStatus = function () {
  if (this.read === 'Read') {
    this.read = 'Unread';
  } else {
    this.read = 'Read';
  };
};

function toggleBlurBg() {
  if (blurBg.style.filter == '') {
      blurBg.style.filter = 'blur(2px)';
  } else {
    blurBg.style.filter = '';
  }
};
