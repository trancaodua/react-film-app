import React, { useState,useEffect } from "react";
import FilmPage from "./FilmPage";
import {useSearchParams} from "react-router-dom";
const API_KEY = "c0ee81caaec6f443c611f854b5ac8848";

function FilmFavorite() {
    const [url, setUrl] = useState(null);
    const [searchParams,setSearchParams] = useSearchParams();
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
                    const sessionId = data["session_id"];

                    res = await fetch(
                        `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${data["session_id"]}`
                    );

                   
                    data = await res.json();

                    setUrl(
                        `https://api.themoviedb.org/3/account/${data["id"]}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}`
                    );
                } catch (error) {
                    console.log(error.message);
                }
            };

            senFavoritaMovie();
        } else {
            const createToken = async () => {
                let res = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`);
                let data = await res.json();
                window.location.assign(
                    `https://www.themoviedb.org/authenticate/${data["request_token"]}?redirect_to=${window.location.href}`
                );
            };

            createToken();
        }
    }, []);
    return <>{url && <FilmPage url={url} title={"My Favorite Movies"} />}</>;
}

export default FilmFavorite;
