import { Link } from 'react-router-dom';

function BookCard({ book }) {
  return (
    <Link to={`/books/${book.id}`} className="book-card">
      {book.coverUrl && <img src={book.coverUrl} alt={book.title} loading="lazy" />}
      <h3>{book.title}</h3>
      <p className="book-author">{book.author}</p>
      {book.genre && <span className="book-genre">{book.genre.name}</span>}
    </Link>
  );
}

export default BookCard;   
