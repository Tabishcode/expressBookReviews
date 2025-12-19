# Book Review Application - Node.js Express Project

A server-side online book review application built with **Express.js**, utilizing **JWT (JSON Web Token)** for authentication and **Promises/Async-Await** for asynchronous data handling.

## 🚀 Features
- **General User Operations:**
  - Get the list of all books.
  - Search for books by ISBN, Author, or Title.
  - View book reviews.
  - Register as a new user.
- **Registered User Operations:**
  - Secure Login with JWT.
  - Add or modify a book review (restricted to the logged-in user).
  - Delete a book review (restricted to the user who created it).
- **Asynchronous Programming:** - All public search routes are implemented using Promises to ensure non-blocking execution.

## 🛠️ Tech Stack
- **Node.js**
- **Express.js**
- **JSON Web Tokens (JWT)**
- **CORS** (to allow cross-origin API testing)

## 📂 Project Structure
- `index.js` - Main entry point and authentication middleware.
- `router/general.js` - Routes for public access (search, registration).
- `router/auth_users.js` - Routes for registered users (login, reviews).
- `router/booksdb.js` - Local database containing book records.

## 🚦 How to Run
1. Clone the repository:
   ```bash
   git clone https://github.com/Tabishcode/expressBookReviews
