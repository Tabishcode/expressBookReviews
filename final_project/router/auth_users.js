const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// Task 7: Login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  const validUser = users.find(
    (u) => u.username === username && u.password === password
  );

  if (validUser) {
    let accessToken = jwt.sign({ username: username }, "access", {
      expiresIn: 3600,
    });
    return res
      .status(200)
      .json({ message: "User successfully logged in", token: accessToken });
  } else {
    return res
      .status(208)
      .json({ message: "Invalid Login. Check username and password" });
  }
});

// Task 8: Add/Modify review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.user.username; // From Token

  if (books[isbn]) {
    books[isbn].reviews[username] = review;
    return res
      .status(200)
      .send(`Review for ISBN ${isbn} updated by ${username}`);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Task 9: Delete review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user.username; // From Token

  if (books[isbn] && books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    return res
      .status(200)
      .send(`Review by ${username} for ISBN ${isbn} deleted.`);
  } else {
    return res.status(404).json({ message: "Review not found" });
  }
});

module.exports.authenticated = regd_users;
module.exports.users = users;
