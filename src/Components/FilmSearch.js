import React from "react";
import FilmPage from "./FilmPage";
import { useParams } from "react-router-dom";
const API_KEY = "c0ee81caaec6f443c611f854b5ac8848";

function FilmSearch() {
    const { search } = useParams();
    return (
        <FilmPage
            url={`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`}
            title={`Result of "${search}"`}
        />
    );
}

export default FilmSearch;
