// PAGE 2 - Book Details (route "/books/:id").
// Shows one book; Edit shows BookForm on the same page; Delete removes the book.
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import BookForm from "../components/BookForm.jsx";
import LoadingMessage from "../components/LoadingMessage.jsx";
import { getBook, updateBook, deleteBook } from "../services/bookService.js";

const PLACEHOLDER = "https://placehold.co/300x420?text=No+Cover";

function BookDetails() {
  const { id } = useParams();       // reads :id from the URL
  const navigate = useNavigate();   // used to go back to Home after delete

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // useEffect: runs when the page opens (and again if the id in the URL changes).
  // It fetches this one book from GET /api/books/:id.
  useEffect(() => {
    async function fetchBook() {
      try {
        setBook(await getBook(id));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [id]);

  // Called by BookForm when the edit form is submitted (PUT)
  async function handleUpdate(formData) {
    try {
      const updated = await updateBook(id, formData);
      setBook(updated);
      setIsEditing(false);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  // Delete button (DELETE), then back to Home
  async function handleDelete() {
    if (!window.confirm("Delete this book?")) return;
    try {
      await deleteBook(id);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  // Favourite toggle (PUT)
  async function handleFavourite() {
    try {
      setBook(await updateBook(id, { isFavourite: !book.isFavourite }));
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <LoadingMessage text="Loading book details..." />;
  if (!book) {
    return (
      <p className="message error-box">
        {error || "Book not found"} <Link to="/">Back to books</Link>
      </p>
    );
  }

  return (
    <section>
      <Link to="/" className="back-link">← Back to books</Link>
      {error && <p className="message error-box">{error}</p>}

      {isEditing ? (
        <div className="form-card">
          <h1>Edit Book</h1>
          {/* Same BookForm as the Add page, pre-filled with this book's data */}
          <BookForm
            initialData={book}
            onSubmit={handleUpdate}
            submitLabel="Save Changes"
            onCancel={() => setIsEditing(false)}
          />
        </div>
      ) : (
        <div className="details">
          <img
            src={book.image || PLACEHOLDER}
            alt={book.title}
            onError={(event) => { event.target.src = PLACEHOLDER; }}
          />
          <div className="details-info">
            <h1>{book.title}</h1>
            <p className="author">by {book.author}</p>
            <p><strong>Category:</strong> {book.category}</p>
            <p><strong>Published:</strong> {book.publishedYear}</p>
            <p><strong>Price:</strong> ₹{book.price}</p>
            <p><strong>Favourite:</strong> {book.isFavourite ? "Yes ★" : "No"}</p>
            <p className="description">{book.description}</p>
            <div className="form-actions">
              <button className="btn" onClick={handleFavourite}>
                {book.isFavourite ? "★ Remove Favourite" : "♡ Add to Favourites"}
              </button>
              <button className="btn primary" onClick={() => setIsEditing(true)}>Edit</button>
              <button className="btn danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default BookDetails;
