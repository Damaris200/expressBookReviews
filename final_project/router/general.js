const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required" });
  if (users[username])
    return res.status(409).json({ message: "User already exists" });
  users[username] = { password };
  return res.status(201).json({ message: "User registered successfully" });
});

public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});

public_users.get('/isbn/:isbn', function (req, res) {
  const book = books[req.params.isbn];
  return book
    ? res.status(200).json(book)
    : res.status(404).json({ message: "Book not found" });
});

public_users.get('/author/:author', function (req, res) {
  const result = Object.values(books).filter(b => b.author === req.params.author);
  return result.length > 0
    ? res.status(200).json(result)
    : res.status(404).json({ message: "No books found for this author" });
});

public_users.get('/title/:title', function (req, res) {
  const result = Object.values(books).filter(b => b.title === req.params.title);
  return result.length > 0
    ? res.status(200).json(result)
    : res.status(404).json({ message: "No books found with this title" });
});

public_users.get('/review/:isbn', function (req, res) {
  const book = books[req.params.isbn];
  return book
    ? res.status(200).json(book.reviews)
    : res.status(404).json({ message: "Book not found" });
});

module.exports.general = public_users;