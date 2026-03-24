const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 6 - Register new user
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const userExists = users.find(u => u.username === username);
  if (userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  users.push({ username, password });
  return res.status(200).json({ message: "User registered successfully" });
});

// Task 1 - Get all books
public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});

// Task 2 - Get book by ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    return res.status(200).json(book);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Task 3 - Get books by author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const result = [];
  const keys = Object.keys(books);
  keys.forEach(key => {
    if (books[key].author === author) {
      result.push(books[key]);
    }
  });
  if (result.length > 0) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({ message: "No books found for this author" });
  }
});

// Task 4 - Get books by title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const result = [];
  const keys = Object.keys(books);
  keys.forEach(key => {
    if (books[key].title === title) {
      result.push(books[key]);
    }
  });
  if (result.length > 0) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({ message: "No books found with this title" });
  }
});

// Task 5 - Get book reviews by ISBN
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    if (Object.keys(book.reviews).length > 0) {
      return res.status(200).json(book.reviews);
    } else {
      return res.status(200).json({ message: "No reviews found for this book." });
    }
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Task 10 - Get all books using Async/Await
public_users.get('/async/books', async (req, res) => {
  try {
    const getBooks = () => {
      return new Promise((resolve) => {
        resolve(books);
      });
    };
    const result = await getBooks();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Task 11 - Get book by ISBN using Promise
public_users.get('/promise/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const getBook = new Promise((resolve, reject) => {
    const book = books[isbn];
    if (book) {
      resolve(book);
    } else {
      reject("Book not found");
    }
  });
  getBook
    .then(book => res.status(200).json(book))
    .catch(err => res.status(404).json({ message: err }));
});

// Task 12 - Get books by author using Async/Await
public_users.get('/async/author/:author', async (req, res) => {
  try {
    const author = req.params.author;
    const getByAuthor = () => {
      return new Promise((resolve, reject) => {
        const result = Object.values(books).filter(b => b.author === author);
        if (result.length > 0) resolve(result);
        else reject("No books found for this author");
      });
    };
    const result = await getByAuthor();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(404).json({ message: err });
  }
});

// Task 13 - Get books by title using Async/Await
public_users.get('/async/title/:title', async (req, res) => {
  try {
    const title = req.params.title;
    const getByTitle = () => {
      return new Promise((resolve, reject) => {
        const result = Object.values(books).filter(b => b.title === title);
        if (result.length > 0) resolve(result);
        else reject("No books found with this title");
      });
    };
    const result = await getByTitle();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(404).json({ message: err });
  }
});

module.exports.general = public_users;