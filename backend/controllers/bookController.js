// Controller: the actual logic for each API route (CRUD).
const books = require("../data/books");

// Next id = highest existing id + 1
let nextId = Math.max(...books.map((b) => b.id)) + 1;

// Returns an error message if the book is invalid, otherwise null.
function validateBook(book) {
  const currentYear = new Date().getFullYear();
  if (!book.title || !String(book.title).trim()) return "Title is required";
  if (!book.author || !String(book.author).trim()) return "Author is required";
  if (!book.category) return "Category is required";
  if (!book.description || !String(book.description).trim()) return "Description is required";
  if (!(Number(book.price) > 0)) return "Price must be greater than 0";
  const year = Number(book.publishedYear);
  if (!Number.isInteger(year) || year < 1000 || year > currentYear) {
    return `Published year must be between 1000 and ${currentYear}`;
  }
  return null;
}

// GET /api/books  -> 200 + all books
function getAllBooks(req, res) {
  res.status(200).json(books);
}

// GET /api/books/:id  -> 200 + one book, or 404
function getBookById(req, res) {
  const book = books.find((b) => b.id === Number(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.status(200).json(book);
}

// POST /api/books  -> 201 + created book, or 400
function createBook(req, res) {
  const error = validateBook(req.body);
  if (error) return res.status(400).json({ message: error });

  const newBook = {
    id: nextId++,
    title: req.body.title.trim(),
    author: req.body.author.trim(),
    category: req.body.category,
    description: req.body.description.trim(),
    price: Number(req.body.price),
    publishedYear: Number(req.body.publishedYear),
    image: req.body.image || "",
    isFavourite: false
  };
  books.push(newBook);
  res.status(201).json(newBook);
}

// PUT /api/books/:id  -> 200 + updated book, 400 or 404
function updateBook(req, res) {
  const index = books.findIndex((b) => b.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Book not found" });

  // Merge old data with the new fields (so a favourite toggle can send just isFavourite)
  const updated = { ...books[index], ...req.body, id: books[index].id };
  const error = validateBook(updated);
  if (error) return res.status(400).json({ message: error });

  updated.price = Number(updated.price);
  updated.publishedYear = Number(updated.publishedYear);
  books[index] = updated;
  res.status(200).json(updated);
}

// DELETE /api/books/:id  -> 200 + message, or 404
function deleteBook(req, res) {
  const index = books.findIndex((b) => b.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Book not found" });
  books.splice(index, 1);
  res.status(200).json({ message: "Book deleted" });
}

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };
