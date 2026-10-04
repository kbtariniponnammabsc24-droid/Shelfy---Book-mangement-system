# Book Management System – College Report Content & Viva Preparation

## 1. Title
Book Management System

## 2. Problem Statement
Keeping book records in notebooks or spreadsheets makes it hard to find, update and organise information. Searching by author or category is slow and records can be lost or duplicated. This project provides a simple web application where books can be stored, searched, filtered, edited, deleted and marked as favourites.

## 3. Project Objective
To build a beginner-friendly full-stack application using React for the user interface and Express for a REST API, demonstrating core React concepts and complete CRUD operations.

## 4. Technologies Used
React.js, JavaScript, React Router DOM, Node.js, Express.js, HTML, CSS (with media queries), CORS, Vite.

## 5. Selected YouTube Tutorial
**Build a Full Stack Book Store App Using React, Node, MongoDB** – freeCodeCamp.org
https://www.youtube.com/watch?v=pgw2KPfgK1E

The tutorial was used as a reference for learning React component structure, routing, CRUD concepts and frontend-backend integration. The final project was simplified and modified into a 3-page Book Management System: MongoDB was replaced with a simple in-memory data file, the pages were reduced to Home, Book Details and Add Book, and search, category filtering and favourites were added.

## 6. System / Component Structure
```
App (Router + layout)
 ├─ Navbar, Footer
 └─ Routes
     ├─ "/"          Home ── SearchBar, CategoryFilter, BookList ── BookCard
     ├─ "/books/:id" BookDetails ── BookForm (edit)
     └─ "/add"       AddBook ── BookForm (add)
```
**Communication:** Parents send data down with props (`Home → BookList → BookCard`). Children send actions up with callback props (`BookCard.onFavourite → BookList → Home.handleFavourite`). SearchBar and CategoryFilter work the same way using `onChange`. Home then calls the API through `bookService.js`.

## 7. Important React Concepts Implemented
- **Components** – UI is split into small reusable files (Navbar, BookCard, BookForm…).
- **Functional components** – all components except one.
- **Class component** – `LoadingMessage.jsx` (`extends React.Component`), shown while data loads.
- **Parent-child components** – Home → BookList → BookCard.
- **Props** – `books`, `book`, `onFavourite`, `value`, `onChange`, `initialData`, `onSubmit`.
- **useState** – books, search term, category, favourites filter, loading, error, form inputs and validation errors.
- **useEffect** – Home fetches all books on load; BookDetails fetches one book using the URL id.
- **Event handling** – onClick (favourite, delete, edit), onChange (search, filter, form fields), onSubmit (forms).
- **Form handling** – controlled inputs in `BookForm.jsx` with validation messages.
- **Client-side routing** – React Router: `/`, `/books/:id`, `/add` (plus a simple not-found fallback).

## 8. Express.js Backend
- **Express server** (`server.js`) listens on port 5000, uses `cors()` and `express.json()`.
- **REST APIs** – URLs represent resources (`/api/books`), HTTP methods represent actions.
- **HTTP methods** – GET (read), POST (create), PUT (update), DELETE (delete).
- **Routes** – `bookRoutes.js` connects each method + URL to a controller function.
- **CRUD** – implemented in `bookController.js` on the array in `data/books.js`, with status codes 200, 201, 400, 404, 500.
- **Frontend-backend communication** – React calls `fetch()` in `bookService.js`; Express replies with JSON.

## 9. Modifications Made
**Modification 1 – Search + category filtering.** Users search by title or author and choose a category. Home filters the book list using both conditions (and the favourites toggle) at once.
**Modification 2 – Favourite books.** Each BookCard has a ♡ Favourite / ★ Favourited button. Clicking it sends a PUT request that flips `isFavourite`. The Home page can show All Books or only Favourites.

## 10. Challenges Faced
- Connecting React with Express (CORS errors and different ports).
- Managing form state for many inputs with one `handleChange`.
- Handling API errors and showing useful messages.
- Passing props and callbacks through several components.
- Setting up React Router and reading the `:id` parameter.
- Making the interface responsive with media queries.

## 11. Conclusion
The project met its aim of building a simple, working full-stack application. It covers the key React concepts, a REST API with full CRUD, and two extra features. It gave practical experience with frontend-backend integration and can be extended with a database and authentication.

---

# Viva Questions & Short Answers

1. **What is React?** A JavaScript library for building user interfaces from components.
2. **Why React?** Reusable components, fast updates, and the UI re-renders automatically when state changes.
3. **What is a component?** A reusable piece of UI, like BookCard or Navbar.
4. **Functional vs class component?** Functional = a JS function (uses hooks). Class = `extends React.Component` with a `render()` method. Mine: `LoadingMessage` is the class; the rest are functional.
5. **What are props?** Read-only data passed from parent to child, e.g. `<BookCard book={book} />`.
6. **Parent-child communication?** Parent → child with props; child → parent by calling a function prop (`onFavourite`).
7. **What is useState?** A hook that stores data in a component; changing it re-renders the UI.
8. **What is useEffect?** A hook for side effects such as fetching data after the component renders.
9. **Why useEffect?** To call the API when a page opens: Home loads all books, BookDetails loads one book.
10. **What is React Router?** A library that shows different components for different URLs.
11. **Client-side routing?** Page changes happen in the browser without reloading the page or asking the server for a new HTML page.
12. **What is Express.js?** A Node.js framework for building servers and APIs.
13. **What is a REST API?** A way to use URLs and HTTP methods to work with data, returning JSON.
14. **Why GET/POST/PUT/DELETE?** GET reads, POST creates, PUT updates, DELETE removes – each matches a CRUD action.
15. **How does React talk to Express?** React uses `fetch()` to send HTTP requests to `http://localhost:5000/api/books`; Express returns JSON; CORS allows it.
16. **Your two modifications?** (1) Search + category filter. (2) Favourite books with a favourites filter.
17. **Where is form handling?** `BookForm.jsx` – controlled inputs, validation, `onSubmit`; used by AddBook and BookDetails.
18. **Where is event handling?** onClick: favourite/delete/edit buttons. onChange: search, category, form inputs. onSubmit: BookForm.
19. **Where is the class component?** `frontend/src/components/LoadingMessage.jsx`, shown in Home and BookDetails while loading.
20. **Flow when a user adds a book?** Click Add Book → `/add` page → fill form → BookForm validates → `onSubmit` calls AddBook's `handleAdd` → `createBook()` sends POST `/api/books` → Express validates, adds the book, returns 201 → React navigates to `/` → Home's useEffect fetches the list and the new book appears.
