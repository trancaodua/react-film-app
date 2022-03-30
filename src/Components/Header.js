import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const API_KEY = "c0ee81caaec6f443c611f854b5ac8848";

function Header() {
    const categoryEl = useRef(null);
    const [isOpenCategory, setIsOpenCategory] = useState(false);
    const [category, setCategory] = useState([]);
    const [search, setSearch] = useState("");
    const [count, setCount] = useState(0);
    let navigate = useNavigate();

    const hanldeClickCount = (e) => {
        setCount(count + 1);
        console.log(count);
    };

    const onClickHandler = () => {
        setIsOpenCategory(!isOpenCategory);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`../search/${search}`);
    };

    useEffect(() => {
        const onClickOutsideHandler = (event) => {
            console.log(`int: ${isOpenCategory}`);
            if (isOpenCategory && !categoryEl.current.contains(event.target)) {
                setIsOpenCategory(false);
            }
        };

        window.addEventListener("click", onClickOutsideHandler);

        return () => {
            window.removeEventListener("click", onClickOutsideHandler);
        };
    }, [isOpenCategory]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
            const data = await res.json();
            if (res.ok) {
                setCategory(data.genres);
            } else {
                console.log(data.message);
            }
            try {
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <header className="header">
            <div className="logo">
                <a href="/"></a>
            </div>
            <div className="navigation">
                <ul className="menu" role="navigation">
                    <li className="actived">
                        <button onClick={(e) => hanldeClickCount(e)}>Count</button>
                    </li>
                    <li className="actived">
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li className="relative" ref={categoryEl} onClick={onClickHandler}>
                        Categories
                        {isOpenCategory && (
                            <ul className="category">
                                {category.map((item) => (
                                    <Link key={item.id} to={`/genre/${item.id}/${item.name}`}>
                                        <li>{item.name}</li>
                                    </Link>
                                ))}
                            </ul>
                        )}
                    </li>
                    <li className="actived">
                        <Link to={"/movie/favorite"}>Farovite</Link>
                    </li>
                </ul>
                <div className="search-profile-wrapper">
                    <div className="search">
                        <form id="form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={search}
                                onChange={(event) => {
                                    setSearch(event.target.value);
                                }}
                                autoComplete="off"
                                placeholder="Search"
                            />
                        </form>
                    </div>
                    <div className="profile">
                        <input type="checkbox" id="profile-checkbox" />
                        <label forhtml="profile-checkbox" className="profile-label">
                            <div className="profile-avatar"></div>
                            <span>trancaodua</span>
                        </label>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
