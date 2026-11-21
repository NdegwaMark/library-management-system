import { useState, useEffect } from 'react';
import BookCard from './BookCard';
import SkeletonCard from './SkeletonCard';

const API_URL = import.meta.env.VITE_API_URL;

function BookGrid({ search, genreId, sortBy }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (genreId) params.append('genreId', genreId);
    if (search) params.append('search', search);
    if (sortBy) params.append('sortBy', sortBy);

    setLoading(true);
    setError(null);

    fetch(`${API_URL}/books?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch books');
        return res.json();
      })
      .then((data) => setBooks(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [search, genreId, sortBy]);

  if (loading) {
    return (
      <div className="book-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>Something went wrong: {error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="empty-state">
        <p>No books found. Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookGrid;   
