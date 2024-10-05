import React, { useState, useEffect } from 'react';
import './MovieTable.css';

const MovieTable = ({ data, filter }) => {
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
    const [highlightedRow, setHighlightedRow] = useState(null);
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const savedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
        setFavourites(savedFavourites);
    }, []);

    const filteredData = data.data.filter((movie) =>
        movie.Title.toLowerCase().includes(filter.toLowerCase())
    );

    const sortData = (key) => {
        let direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction });

        return filteredData.sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    };

    const handleSelectMovie = (movie) => {
        setSelectedMovies((prevSelected) => {
            if (prevSelected.includes(movie)) {
                return prevSelected.filter((m) => m !== movie);
            } else {
                return [...prevSelected, movie];
            }
        });
    };

    const addToFavourites = () => {
        const updatedFavourites = [...favourites, ...selectedMovies];
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
        setSelectedMovies([]);
    };

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Select</th>
                    <th onClick={() => sortData('Title')}>
                        <div className="sort-indicator">
                            Title
                            <span className={`sort-arrow ${sortConfig.direction === 'asc' ? 'sort-asc' : 'sort-desc'}`} />
                        </div>
                    </th>
                    <th onClick={() => sortData('Year')}>
                        <div className="sort-indicator">
                            Year
                            <span className={`sort-arrow ${sortConfig.direction === 'asc' ? 'sort-asc' : 'sort-desc'}`} />
                        </div>
                    </th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map((movie, index) => (
                    <tr
                        key={movie.imdbID}
                        className={highlightedRow === index ? 'selected-row' : ''}
                        onClick={() => setHighlightedRow(index)}
                        style={{ cursor: 'pointer' }}
                    >
                        <td>
                            <input
                                type="checkbox"
                                checked={selectedMovies.includes(movie)}
                                onChange={() => handleSelectMovie(movie)}
                            />
                        </td>
                        <td>{movie.Title}</td>
                        <td>{movie.Year}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <button
                onClick={addToFavourites}
                disabled={selectedMovies.length === 0}
                className="favourites-button"
            >
                Add to My Favourites
            </button>

            <h2>Favourites</h2>
            <ul>
                {favourites.map((movie, index) => (
                    <li key={index}>{movie.Title} ({movie.Year})</li>
                ))}
            </ul>
        </div>
    );
};

export default MovieTable;
