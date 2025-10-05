# Book Review Platform

A full-stack web application for managing and reviewing books. Users can browse, search, add, edit, and delete books, as well as add reviews and ratings.

## Features

- **User Authentication:** Signup and login with JWT-based security.
- **Book Management:** Logged-in users can add, edit, or delete their own books.
- **Book Listing:** View all books with pagination (5 per page) and search functionality.
- **Book Details:** See book info, all reviews, and average rating.
- **Review System:** Users can add, edit, or delete their own reviews.
- **Dark/Light Mode:** Switchable UI theme.
- **Responsive Design:** Works across devices.

## Pages

- **Signup Page:** Register new users.
- **Login Page:** Login and store JWT token in localStorage.
- **Book List Page (Home):** Show all books with pagination and search.
- **Book Details Page:** Show book information, reviews, and average rating.
- **Add/Edit Book Page:** Form to add or edit books (logged-in users only).
- **Profile Page (optional):** Show user’s added books and reviews.

## Tech Stack

- **Frontend:** React.js, React Router, Axios, CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** [Frontend Link] | [Backend API Link]

## Installation

1. Clone the repo:  
   ```bash
   git clone <repo-url>
   cd Book-Review-Platform
   
## Install Dependencies
  npm install

## Create a .env file
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
## Run The App
npm run dev

## 📸 Project Screenshots

### 🏠 Home Page
![Home Page](Frontend/screenshots/home.png)

### 🔐 Login Page
![Login Page](Frontend/screenshots/Login.png)

### 🔐 Signup Page
![Signup Page](Frontend/screenshots/signup.png)

### 📚Add-Book Page
![Add-Book Page](Frontend/screenshots/add-book.png)

