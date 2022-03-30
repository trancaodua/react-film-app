import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
const API_KEY = "c0ee81caaec6f443c611f854b5ac8848";

function FilmDetail({}) {
    let { id } = useParams();
    const [detail, setDetail] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
                const data = await res.json();
                if (res.ok) {
                    setDetail(data);
                } else {
                    console.log(data.message);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [searchParams]);

    useEffect(() => {
        if (searchParams.get("request_token") && searchParams.get("approved")) {
            const senFavoritaMovie = async () => {
                try {
                    let res = await fetch(
                        `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ request_token: searchParams.get("request_token") }),
                        }
                    );

                    let data = await res.json();

                    res = await fetch(
                        `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${data["session_id"]}`
                    );

                    const sessionId = data["session_id"];

                    data = await res.json();

                    res = await fetch(
                        `https://api.themoviedb.org/3/account/${data["id"]}/favorite?api_key=${API_KEY}&session_id=${sessionId}`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ media_type: "movie", media_id: id, favorite: true }),
                        }
                    );

                    data = await res.json();
                } catch (error) {}
                setSearchParams({});
            };

            senFavoritaMovie();
        }
    }, []);

    const markFavoriteMovie = async () => {
        let res = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`);
        let data = await res.json();
        window.location.assign(
            `https://www.themoviedb.org/authenticate/${data["request_token"]}?redirect_to=${window.location.href}`
        );
    };

    return (
        <>
            {detail && (
                <div className="detail-wrapper">
                    <div className="detail-left">
                        <img src={`https://image.tmdb.org/t/p/original/${detail["poster_path"]}`} alt="" />
                    </div>
                    <div className="detail-right">
                        <h1>{detail["title"]}</h1>
                        <div>
                            <strong>Overview: </strong>
                            <label>{detail["overview"]}</label>
                        </div>
                        <div>
                            <strong>IMDb: </strong>
                            <label>{`${detail["vote_average"]}`}</label>
                        </div>
                        <div>
                            <strong>Runtime: </strong>
                            <label>{`${detail["runtime"]}'`}</label>
                        </div>
                        <div>
                            <strong>Genres: </strong>
                            <label>{detail["genres"].map((item) => item["name"]).join(", ")}</label>
                        </div>
                        <div>
                            <strong>Production Companies: </strong>
                            <label>{detail["production_companies"].map((item) => item["name"]).join(", ")}</label>
                        </div>
                        <div>
                            <strong>Production Countries: </strong>
                            <label>{detail["production_countries"].map((item) => item["name"]).join(", ")}</label>
                        </div>
                        <div>
                            <strong>Release date: </strong>
                            <label>{detail["release_date"]}</label>
                        </div>
                        <button onClick={markFavoriteMovie}>Like</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default FilmDetail;
