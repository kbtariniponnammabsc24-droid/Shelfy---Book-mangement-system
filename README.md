# Book Management System

## 1. Project Description
A simple full-stack web app to browse, search, add, edit, delete and favourite books. React (frontend) talks to an Express REST API (backend) using `fetch()`.

## 2. Problem Statement
Managing book information manually (notebooks, spreadsheets) is slow, error-prone and hard to search. This app gives a simple digital catalogue where books can be stored, searched, filtered and updated in one place.

## 3. Objectives
- Build a React + Express application with full CRUD.
- Practise React concepts: components, props, state, effects, forms, routing.
- Connect a React frontend to a REST API.
- Add search, category filtering and favourites.

## 4. Features
- View all books in a responsive card grid
- Search by title or author, filter by category (both work together)
- Favourite / unfavourite books and view only favourites
- Book details page with Edit (inline form) and Delete
- Add Book form with validation
- Loading and error messages

## 5. Technologies Used
React.js, JavaScript, React Router DOM, HTML, CSS, Node.js, Express.js, CORS, Vite (dev server).

## 6. React Concepts Demonstrated
| Concept | Where |
|---|---|
| Components / reusable components | `frontend/src/components/*` |
| Functional components | Home, BookDetails, AddBook, Navbar, BookCard, BookList, BookForm |
| **Class component** | `components/LoadingMessage.jsx` (used in Home and BookDetails) |
| Props | Home → BookList → BookCard (`books`, `book`) |
| Parent-child communication | `onFavourite` callback: BookCard → BookList → Home |
| useState | Home (books, search, category, favourites, loading, error), BookForm (inputs, errors) |
| useEffect | Home (fetch all books), BookDetails (fetch one book by URL id) |
| Event handling | onClick (buttons), onChange (inputs), onSubmit (forms) |
| Form handling + validation | `components/BookForm.jsx` |
| React Router | `App.jsx`, `Navbar.jsx`, `useParams`, `useNavigate` |

## 7. Backend / API Details
Express server on port **5000**. `routes/bookRoutes.js` maps URLs to functions in `controllers/bookController.js`. Data is an in-memory array in `data/books.js` (resets on server restart). CORS is enabled, responses are JSON, and errors return proper status codes (400, 404, 500).

## 8. API Endpoints
| Method | URL | Purpose | Success |
|---|---|---|---|
| GET | /api/books | all books | 200 |
| GET | /api/books/:id | one book | 200 / 404 |
| POST | /api/books | add book | 201 / 400 |
| PUT | /api/books/:id | update book (also used for favourite toggle) | 200 / 400 / 404 |
| DELETE | /api/books/:id | delete book | 200 / 404 |

## 9. Project Structure
```
book-management-system/
├── backend/
│   ├── server.js
│   ├── routes/bookRoutes.js
│   ├── controllers/bookController.js
│   └── data/books.js
├── frontend/
│   ├── index.html, vite.config.js
│   └── src/
│       ├── main.jsx, App.jsx, App.css
│       ├── components/ (Navbar, Footer, BookCard, BookList, BookForm, SearchBar, CategoryFilter, LoadingMessage)
│       ├── pages/ (Home, BookDetails, AddBook)
│       └── services/bookService.js
└── README.md
```

## 10. Installation
Install [Node.js](https://nodejs.org) (v18+), then:
```
cd backend  && npm install
cd ../frontend && npm install
```

## 11. Run the Backend (Terminal 1)
```
cd backend
npm start
```
Runs at http://localhost:5000 (test: http://localhost:5000/api/books)

## 12. Run the Frontend (Terminal 2)
```
cd frontend
npm run dev
```
Open http://localhost:5173. **Start the backend first.**

## 13. Modifications Made
1. **Search + category filter** – search title/author and filter by category together (Home page).
2. **Favourite books** – ♡/★ button on every card, plus an "All Books / Favourites" toggle.

Also: simplified to exactly 3 pages, with edit done inside the Book Details page.

## 14. Reference
Concepts learned from *Build a Full Stack Book Store App Using React, Node, MongoDB* (freeCodeCamp.org): https://www.youtube.com/watch?v=pgw2KPfgK1E. This project is simplified (no MongoDB), restructured and extended.

## 15. Future Improvements
Use MongoDB for permanent storage, add login, pagination, image upload, sorting by price/year, and automated tests.
