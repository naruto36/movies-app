import { useState, useEffect } from 'react';
import axios from 'axios';

const useMoviesNames = (pageNumber) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://jsonmock.hackerrank.com/api/movies/search/?page=${pageNumber}`)
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Eror fetcing data While selecting moviws:", error);
            });
    }, [pageNumber]);

    return { data, loading };
};

export default useMoviesNames;
