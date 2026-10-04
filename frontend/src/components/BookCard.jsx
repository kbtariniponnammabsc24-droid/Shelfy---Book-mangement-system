// Child component. Data comes IN through props (book),
// user actions go OUT through the callback prop (onFavourite).
import { Link } from "react-router-dom";

const PLACEHOLDER = "https://placehold.co/300x420?text=No+Cover";

function BookCard({ book, onFavourite }) {
  return (
    <article className="book-card">
      <Link to={`/books/${book.id}`}>
        <img
          src={book.image || PLACEHOLDER}
          alt={book.title}
          onError={(event) => { event.target.src = PLACEHOLDER; }}
        />
      </Link>
      <div className="book-card-body">
        <h3>{book.title}</h3>
        <p className="author">{book.author}</p>
        <p className="category-tag">{book.category}</p>
        <p className="price">₹{book.price}</p>
        {/* Child -> Parent: tell Home which book was clicked */}
        <button
          className={book.isFavourite ? "btn fav-btn active" : "btn fav-btn"}
          onClick={() => onFavourite(book)}
        >
          {book.isFavourite ? "★ Favourited" : "♡ Favourite"}
        </button>
      </div>
    </article>
  );
}

export default BookCard;
