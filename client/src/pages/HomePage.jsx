import { useState } from 'react';
import BookGrid from '../components/BookGrid';
import SearchBar from '../components/SearchBar';

function HomePage() {
  const [search, setSearch] = useState('');
  const [genreId, setGenreId] = useState('');
  const [sortBy, setSortBy] = useState('');

  return (
    <div className="home-page">
      <h1>Book Catalog</h1>

      <div className="controls">
        <SearchBar onSearch={setSearch} />

        <select
          value={genreId}
          onChange={(e) => setGenreId(e.target.value)}
          aria-label="Filter by genre"
        >
          <option value="">All Genres</option>
          <option value="1">Fiction</option>
          <option value="2">Non-Fiction</option>
          <option value="3">Science Fiction</option>
          <option value="4">Fantasy</option>
          <option value="5">Mystery</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Sort books"
        >
          <option value="">Sort by…</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
      </div>

      <BookGrid search={search} genreId={genreId} sortBy={sortBy} />
    </div>
  );
}

export default HomePage;   
