import React from 'react';

const Pagination = ({ currentPage, totalPages, setPage }) => {
    return (
        <div>
            <button disabled={currentPage === 1} onClick={() => setPage(1)}>First</button>
            <button disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>Prev</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)}>Next</button>
            <button disabled={currentPage === totalPages} onClick={() => setPage(totalPages)}>Last</button>
        </div>
    );
};

export default Pagination;
