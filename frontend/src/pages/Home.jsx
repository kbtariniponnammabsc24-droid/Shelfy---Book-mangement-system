// PAGE 1 - Home / Books page (route "/").
// Parent component: owns the book data and passes it down to BookList -> BookCard.
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import BookList from "../components/BookList.jsx";
import LoadingMessage from "../components/LoadingMessage.jsx";
import { getBooks, updateBook } from "../services/bookService.js";

function Home() {
  // useState: each piece of state has a real job
  const [books, setBooks] = useState([]);                 // books from the API
  const [searchTerm, setSearchTerm] = useState("");       // text in search bar
  const [category, setCategory] = useState("All");        // selected category
  const [showFavourites, setShowFavourites] = useState(false); // All vs Favourites
  const [loading, setLoading] = useState(true);           // loading state
  const [error, setError] = useState("");                 // error state

  // useEffect: runs once when the page loads ([] = empty dependency list)
  // and fetches all books from the Express API (GET /api/books).
  useEffect(() => {
    async function fetchBooks() {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        setError("Could not load books. Is the backend running? (" + err.message + ")");
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  // Callback passed down to BookCard. Toggles favourite via PUT /api/books/:id
  async function handleFavourite(book) {
    try {
      const updated = await updateBook(book.id, { isFavourite: !book.isFavourite });
      setBooks(books.map((b) => (b.id === updated.id ? updated : b)));
    } catch (err) {
      setError("Could not update favourite: " + err.message);
    }
  }

  // Search + category + favourites filters all work together
  const visibleBooks = books.filter((book) => {
    const text = searchTerm.toLowerCase();
    const matchesSearch =
      book.title.toLowerCase().includes(text) ||
      book.author.toLowerCase().includes(text);
    const matchesCategory = category === "All" || book.category === category;
    const matchesFavourite = !showFavourites || book.isFavourite;
    return matchesSearch && matchesCategory && matchesFavourite;
  });

  return (
    <section>
      <div className="page-header">
        <h1>{showFavourites ? "Favourite Books" : "All Books"}</h1>
        <Link to="/add" className="btn primary">+ Add Book</Link>
      </div>

      <div className="toolbar">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <CategoryFilter selected={category} onChange={setCategory} />
        <div className="toggle">
          <button
            className={!showFavourites ? "btn active" : "btn"}
            onClick={() => setShowFavourites(false)}
          >
            All Books
          </button>
          <button
            className={showFavourites ? "btn active" : "btn"}
            onClick={() => setShowFavourites(true)}
          >
            ★ Favourites
          </button>
        </div>
      </div>

      {error && <p className="message error-box">{error}</p>}
      {loading ? (
        <LoadingMessage />
      ) : (
        <BookList books={visibleBooks} onFavourite={handleFavourite} />
      )}
    </section>
  );
}

export default Home;
