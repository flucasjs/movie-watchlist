import "./App.css";
import React from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Modal from "./components/Modal";
import Header from "./components/Header";
import Search from "./components/Search";
import Watchlist from "./components/Watchlist";

function App() {
  const [searchValue, setSearchValue] = React.useState("");
  const [filmData, setFilmData] = React.useState("");
  const [searchStatus, setSearchStatus] = React.useState(true);
  const [watchlist, setWatchlist] = React.useState(() => JSON.parse(localStorage.getItem("watchlist")) || []);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showRemoveModal, setShowRemoveModal] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist))
  }, [watchlist])

  const handleChange = (e) => {
    const {value} = e.target;
    setSearchValue(value);
  }

  const watchlistContainsFilm = (film) => {
    return watchlist.find(targetFilm => targetFilm.Title === film.Title);
  }

  const addFilmToWatchlist = (film) => {
    const filmInWatchlist = watchlistContainsFilm(film);
    if (!filmInWatchlist) {
      setWatchlist(prevWatchlist => ([
        ...prevWatchlist,
        film
      ]));
      setShowAddModal(true);
      setTimeout(() => {
        setShowAddModal(false)
      }, 1000);
    }
  }

  const removeFilmFromWatchlist = (film) => {
    setWatchlist(prevWatchlist => prevWatchlist.filter(f => f.Title !== film.Title))
    setShowRemoveModal(true);
    setTimeout(() => {
      setShowRemoveModal(false)
    }, 1000);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const url = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${searchValue}&r=json`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.Response === "True") {
          setFilmData(data)
        } else {
          setSearchStatus(false)
          setFilmData("");
          throw new Error(data.Error)
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="app-container">
      <Modal showAddModal={showAddModal} showRemoveModal={showRemoveModal} />
      <Header />

      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.key}>
          <Route exact path="/movie-watchlist/" 
            element={
              <Search
                searchValue={searchValue} 
                handleChange={handleChange} 
                handleSearch={handleSearch} 
                filmData={filmData} 
                addFilmToWatchlist={addFilmToWatchlist} 
                watchlistContainsFilm={watchlistContainsFilm} 
                searchStatus={searchStatus}
              />
            }
          />
            
          <Route path="/movie-watchlist/my-watchlist" 
            element={
              <Watchlist 
                watchlist={watchlist}
                removeFilmFromWatchlist={removeFilmFromWatchlist}
              />
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;