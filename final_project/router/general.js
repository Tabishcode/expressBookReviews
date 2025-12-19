const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 6: Register a new user
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const userExists = users.some((u) => u.username === username);
    if (!userExists) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Username and password required." });
});

// Task 10: Get all books - Using Promises
public_users.get("/", function (req, res) {
  new Promise((resolve) => {
    resolve(books);
  }).then((booksList) =>
    res.status(200).send(JSON.stringify(booksList, null, 4))
  );
});

// Task 11: Get book details based on ISBN - Using Promises
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  new Promise((resolve, reject) => {
    if (books[isbn]) resolve(books[isbn]);
    else reject("Book not found");
  })
    .then((book) => res.status(200).send(book))
    .catch((err) => res.status(404).json({ message: err }));
});

// Task 12: Get book details based on author - Using Promises
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  new Promise((resolve) => {
    let keys = Object.keys(books);
    let filtered = keys
      .filter((k) => books[k].author === author)
      .map((k) => books[k]);
    resolve(filtered);
  }).then((results) => res.status(200).send(results));
});

// Task 13: Get all books based on title - Using Promises
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  new Promise((resolve) => {
    let keys = Object.keys(books);
    let filtered = keys
      .filter((k) => books[k].title === title)
      .map((k) => books[k]);
    resolve(filtered);
  }).then((results) => res.status(200).send(results));
});

// Task 5: Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) res.status(200).send(books[isbn].reviews);
  else res.status(404).json({ message: "Book not found" });
});

module.exports.general = public_users;
