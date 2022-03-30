import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";

const pagePerLoop = 10;
function FilmPage({ url, title }) {
    const [films, setFilms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLoopIndex, setPageLoopIndex] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pages, setPages] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePageClick = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    const handleClickPrevNagination = useCallback(() => {
        if (pageLoopIndex > 1) {
            setPageLoopIndex((prevStatus) => prevStatus - 1);
        }
    }, [pageLoopIndex]);

    // const handleClickNextNagination = () => {
    //     if (pageLoopIndex < Math.floor(totalPages / pagePerLoop)) {
    //         setPageLoopIndex((prevStatus) => prevStatus + 1);
    //     }
    // };

    const handleClickNextNagination = useCallback(() => {
        if (pageLoopIndex < Math.floor(totalPages / pagePerLoop)) {
            setPageLoopIndex((prevStatus) => prevStatus + 1);
        }
    }, [pageLoopIndex, totalPages]);

    const pageNagination = useMemo(() => {
        let pageNagination = [];
        const from = (pageLoopIndex - 1) * pagePerLoop + 1;
        const to = pageLoopIndex * pagePerLoop < totalPages ? pageLoopIndex * pagePerLoop : totalPages;
        for (let i = from; i <= to; i++) {
            pageNagination.push(i);
        }
        return pageNagination;
    }, [pageLoopIndex, totalPages]);

    useEffect(() => {
        const fetchFilmData = async () => {
            try {
                const res = await fetch(`${url}&page=${currentPage}`);
                const data = await res.json();
                if (res.ok) {
                    setErrorMessage("");
                    setFilms(data["results"]);
                    setTotalPages(data["total_pages"]);
                } else {
                    setErrorMessage(data.message);
                }
            } catch (error) {
                setErrorMessage(error.message);
            }
        };
        fetchFilmData();
    }, [currentPage, url]);

    return (
        <div className="main">
            <h1>{title}</h1>
            <div className="film-page">
                {films.map((film) => {
                    return (
                        <Link to={`/movie/${film["id"]}`} key={film["id"]}>
                            <div className="film-wrapper">
                                <img src={`https://image.tmdb.org/t/p/original${film["poster_path"]}`} alt="" />
                                <div className="description">{film["original_title"]}</div>
                                <div className="video-play"></div>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <div className="film-page-pagination">
                <button
                    disabled={pages[0] === 1}
                    onClick={() => {
                        handleClickPrevNagination();
                    }}
                >
                    &lt;&lt;
                </button>
                {pageNagination.map((page) => (
                    <button
                        key={page}
                        onClick={() => {
                            handlePageClick(page);
                        }}
                        className={page === currentPage ? "active" : ""}
                    >
                        {page}
                    </button>
                ))}
                <button
                    disabled={pages[pages.length - 1] === totalPages}
                    onClick={() => {
                        handleClickNextNagination();
                    }}
                >
                    &gt;&gt;
                </button>
            </div>
            )
        </div>
    );
}

export default FilmPage;
