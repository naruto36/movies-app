import React, { useState } from 'react';
import MovieTable from './components/MovieTable';
import Pagination from './components/Pagination';
import useMoviesNames from './hooks/useMoviesNames';

function Movies() {
  const [pageNumber, setPageNumber] = useState(1);
  const [filter, setFilter] = useState('');
  const { data, loading } = useMoviesNames(pageNumber);

  if (loading) return <div>Loading...</div>;

  return (
      <div className="Movies">
        <h1>Movie List</h1>
        <input
            type="text"
            placeholder="Filter movies"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
        />
        <MovieTable data={data} filter={filter} />
        <Pagination
            currentPage={pageNumber}
            totalPages={data.total_pages}
            setPage={setPageNumber}
        />
      </div>
  );
}

export default Movies;
