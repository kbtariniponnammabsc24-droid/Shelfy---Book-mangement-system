// Middle component: receives the array of books from Home (props)
// and passes each single book down to BookCard.
import BookCard from "./BookCard.jsx";

function BookList({ books, onFavourite }) {
  if (books.length === 0) {
    return <p className="message">No books match your search or filter.</p>;
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onFavourite={onFavourite} />
      ))}
    </div>
  );
}

export default BookList;
