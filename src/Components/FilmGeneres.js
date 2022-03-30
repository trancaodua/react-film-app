import React from "react";
import FilmPage from "./FilmPage";
import { useParams } from "react-router-dom";
const API_KEY = "c0ee81caaec6f443c611f854b5ac8848";

function GeneresFilm() {
    const { id, title } = useParams();
    return (
        <FilmPage
            url={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}`}
            title={title}
        />
    );
}

export default GeneresFilm;
