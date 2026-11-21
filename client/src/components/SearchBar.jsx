import { useState, useEffect } from 'react';

function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, 400);

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <input
      type="search"
      placeholder="Search by title or author…"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      aria-label="Search books"
    />
  );
}

export default SearchBar;   
