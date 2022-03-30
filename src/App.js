import logo from "./logo.svg";
import "./css/App.css";
import "./css/slider.css";
import "./css/FilmPage.css";
import "./css/FilmDetail.css";
import "./css/Footer.css";
import "./css/header.css";
import FilmPage from "./Components/FilmPage";
import Layout from "./Components/Layout";
import FilmDetail from "./Components/FilmDetail";
import { Route, Routes } from "react-router-dom";
import FilmGeneres from "./Components/FilmGeneres";
import FilmSearch from "./Components/FilmSearch";
import FilmFavorite from "./Components/FilmFavorite";
const API_KEY = "c0ee81caaec6f443c611f854b5ac8848";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route
                    index
                    element={
                        <FilmPage
                            url={`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`}
                            title={"Popular"}
                        />
                    }
                />
                <Route
                    path="/genre/:id/:title"
                    element={
                        <FilmGeneres/>
                    }
                />
                 <Route
                    path="/search/:search"
                    element={
                        <FilmSearch/>
                    }
                />
                <Route path="movie/:id" element={<FilmDetail />} />
                <Route path="movie/favorite" element={<FilmFavorite />} />

            </Route>
        </Routes>
    );
}

export default App;
