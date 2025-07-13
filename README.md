# booksLibraryManagementApp

![Desktop View](../app-desktop-view.png)

## Tech Stack

- **Frontend:** React, Vite, Axios, CSS
- **Backend:** Node.js, Express
- **Database:** JSON file (for demo purposes)

## Folder Structure

```
booksLibraryManagementApp/
├── backend/
│   ├── books.json
│   ├── cleanMyBooks.js
│   ├── db.json
│   ├── MyLibrary.postman_collection.json
│   ├── package.json
│   ├── seed.js
│   ├── server.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookController.js
│   │   └── myBookController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Book.js
│   │   ├── MyBook.js
│   │   └── User.js
│   └── routes/
│       ├── auth.js
│       ├── books.js
│       └── mybooks.js
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   │   └── library.png
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── api/
│       │   └── axiosClient.js
│       ├── components/
│       │   ├── BookCard.jsx
│       │   ├── MyBookCard.jsx
│       │   ├── Navbar.jsx
│       │   └── ProtectedRoute.jsx
│       ├── context/
│       │   ├── AuthContext.jsx
│       │   ├── BooksContext.jsx
│       │   └── MyBooksContext.jsx
│       └── pages/
│           ├── Home.jsx
│           ├── Login.jsx
│           ├── MyBooks.jsx
│           └── Register.jsx
└── app-desktop-view.png
```

## How the App Works

1. **Landing Page:**
   - Users see a welcome message and a preview of the library (see image above).
   - Options to Login or Register are available at the top right.

2. **Authentication:**
   - Users can register for a new account or log in with existing credentials.
   - Authenticated users can access their personal book collection.

3. **Browse Books:**
   - All users can browse the available books in the library.
   - Book cards display book images, titles, and other details.

4. **Manage My Books:**
   - Logged-in users can add books to their personal collection ("My Books").
   - Users can view, add, or remove books from their collection.

5. **Backend API:**
   - The backend provides RESTful endpoints for authentication, book management, and user collections.
   - Data is stored in JSON files for demonstration purposes.

6. **Frontend:**
   - Built with React and Vite for fast development and hot reloading.
   - Uses Axios for API requests and React Context for state management.

---
This project demonstrates a full-stack book library management system suitable for learning and prototyping.