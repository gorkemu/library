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
    <td><button class='status'>${myLibrary[i].read}</button></td>
    <td><button class='remove'>Remove</button></td>`;
    row.dataset.index = i;
    list.appendChild(row);
  }
};

document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();
  addBookToLibrary();
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
  if (e.target.classList.contains('remove')) {
    removeBook(e.target);
  }
  else if (e.target.classList.contains('status')) {
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

