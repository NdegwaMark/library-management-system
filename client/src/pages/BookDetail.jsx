import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`${API_URL}/books/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Book not found');
        return res.json();
      })
      .then((data) => setBook(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="loading">Loading book…</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="book-detail">
      <Link to="/" className="back-link">← Back to catalog</Link>

      <div className="book-detail-content">
        {book.coverUrl && (
          <img src={book.coverUrl} alt={book.title} className="book-detail-cover" />
        )}

        <div className="book-detail-info">
          <h1>{book.title}</h1>
          <p className="book-detail-author">by {book.author}</p>
          {book.genre && <span className="book-genre">{book.genre.name}</span>}
          {book.year && <p>Published: {book.year}</p>}
          {book.description && <p className="book-description">{book.description}</p>}
          {book.isbn && <p>ISBN: {book.isbn}</p>}
          {book.pages && <p>Pages: {book.pages}</p>}
        </div>
      </div>
    </div>
  );
}

export default BookDetail;   
