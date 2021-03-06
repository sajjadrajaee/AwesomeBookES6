import storedData from './modules/storedata.js';
import getData from './modules/getdata.js';
import displayDateTime from './modules/date.js';

displayDateTime();

const displayBook = document.querySelector('.display-Books');
const form = document.querySelector('form');

let books = [];

class Book {
  constructor(title, author, id) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  addBook = () => {
    const id = books.length + 1;

    books.push(new Book(this.title, this.author, id));
    return books;
  }

  static removeBook(bookCollection, id) {
    return bookCollection.filter((book) => book.id !== +id);
  }
}

const displayBooks = () => {
  const allBooks = getData();
  if (allBooks) {
    books = allBooks;
  }
  displayBook.innerHTML = '<h1>All Awesome Books</h1>';
  let index = 1;
  books.forEach((book) => {
    displayBook.insertAdjacentHTML(
      'beforeend',
      `<div class='d-flex justify-content-between p-1 ${index % 2 === 0 ? '' : 'bg-secondary text-white'} border border-dark border-2'><div class='d-flex'><h3>${book.title}
      </h3> &nbsp; &nbsp; <h3>by</h3> &nbsp; &nbsp; <h3>${book.author}</h3></div>
      <button type='button' class='removeBtn btn btn-danger' id=${book.id} title= '${book.title}'>Remove</button></div>`,
    );
    index += 1;
  });
};

form.addEventListener('submit', (e) => {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const newBook = new Book(title, author);
  storedData(newBook.addBook());
  displayBooks();
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  e.preventDefault();
});

displayBook.addEventListener('click', (e) => {
  if (e.target.classList.contains('removeBtn')) {
    const allBooks = getData();
    const { id } = e.target;
    const remainingBooks = Book.removeBook(allBooks, id);
    storedData(remainingBooks);
    displayBooks();
  }
});

const listNav = document.querySelector('#list');
const addNewNav = document.querySelector('#addNew');
const contactNav = document.querySelector('#contact');
const shelveBooks = document.querySelector('#displayBook');
const addNewBook = document.querySelector('#addBook');
const contactInfo = document.querySelector('#contactInfo');

addNewNav.addEventListener('click', (e) => {
  e.preventDefault();
  addNewNav.classList.add('active');
  listNav.classList.remove('active');
  contactNav.classList.remove('active');
  addNewBook.classList.remove('invisible');
  if (shelveBooks) shelveBooks.classList.add('invisible');
  if (contactInfo) contactInfo.classList.add('invisible');
});

listNav.addEventListener('click', (e) => {
  e.preventDefault();
  addNewNav.classList.remove('active');
  listNav.classList.add('active');
  contactNav.classList.remove('active');
  shelveBooks.classList.remove('invisible');
  if (addNewBook) addNewBook.classList.add('invisible');
  if (contactInfo) contactInfo.classList.add('invisible');
});

contactNav.addEventListener('click', (e) => {
  e.preventDefault();
  addNewNav.classList.remove('active');
  listNav.classList.remove('active');
  contactNav.classList.add('active');
  contactInfo.classList.remove('invisible');
  if (addNewBook) addNewBook.classList.add('invisible');
  if (shelveBooks) shelveBooks.classList.add('invisible');
});

window.onload = () => {
  getData();
  displayBooks();
};