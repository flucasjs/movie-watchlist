import "./Search.css";
import React from "react";
import { motion } from "framer-motion";
import SearchIcon from "../SearchIcon";
import EmptySearch from "../EmptySearch";
import FilmContainer from "../FilmContainer";

const containerVariants = {
  hidden: {
    opacity: 0,
    x: '-100vw'
  },
  visibile: {
    opacity: 1,
    x: '0',
    transition: {
      type: 'spring',
      stiffness: 120,
      mass: 0.4,
      damping: 8
    }
  },
  exit: {
    x: '-100vw',
    transition: {
      ease: 'easeInOut'
    }
  }
};

const Search = ({searchValue, handleChange, handleSearch, filmData, addFilmToWatchlist, watchlistContainsFilm, searchStatus}) => {
  return (
    <motion.div 
      className="search-page-container"
      variants={containerVariants}
      initial={"hidden"}
      animate="visibile"
      exit="exit"
    >
      <form>
        <div className="search-container">
          <div className="search-field-container">
            <SearchIcon />
            <input className="search-field" type="text" value={searchValue} onChange={handleChange} placeholder="Search for a movie"></input>
          </div>
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
      </form>

      {
        (filmData) ? 
        <div className="films-container margin-top" style={{"--margin-top": "0.75rem"}}>
          {
            filmData.Search.map(film => {
              return (
                <FilmContainer 
                  key={film.imdbID} 
                  title={film.Title} 
                  handleClick={addFilmToWatchlist} 
                  isFilmInWatchlist={watchlistContainsFilm(film)}
                  action={{symbol: "+", text: "Watchlist"}}
                />
              )
            })
          }
        </div>
        :
        <EmptySearch searchStatus={searchStatus}/>
      }
    </motion.div>
  );
}

export default Search;