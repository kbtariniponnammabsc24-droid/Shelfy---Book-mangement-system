// PAGE 3 - Add Book (route "/add").
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm.jsx";
import { createBook } from "../services/bookService.js";

function AddBook() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Called by BookForm (child -> parent) after validation passes.
  // Sends POST /api/books, then returns to the Home page.
  async function handleAdd(formData) {
    try {
      await createBook(formData);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="form-card">
      <h1>Add a New Book</h1>
      {error && <p className="message error-box">{error}</p>}
      <BookForm onSubmit={handleAdd} submitLabel="Add Book" />
    </section>
  );
}

export default AddBook;
