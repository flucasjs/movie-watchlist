import "./FilmContainer.css"
import React from 'react';
import { motion } from "framer-motion";
import StarIcon from "../StarIcon/";

const FilmContainer = ({title, action, handleClick, isFilmInWatchlist = false}) => {
  const [metaInfo, setMetaInfo] = React.useState({});
  const [filmInWatchlist, setFilmInWatchlist] = React.useState(isFilmInWatchlist);

  React.useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=252ea052&t=${title}&r=json`)
      .then(res => res.json())
      .then(data => setMetaInfo(data))
  }, [title])

  const {Title, Runtime, Genre, Plot, Poster, imdbRating} = metaInfo;

  const handleAction = (e) => {
    handleClick(metaInfo, e); 
    setFilmInWatchlist(true);
  }

  return (
    <>
      <motion.div className="film-container" whileHover={{scale: 1.1}}>
        <div className="film-image-container">
          <img 
            src={Poster} 
            alt={`Poster for the film ${Title}`}
          />
        </div>

        <div className="film-meta-info-container">
          <span className="film-title">{Title}</span>
          <div className="rating-container">
            <StarIcon />
            <span className="film-rating">{imdbRating}</span>
          </div>
          <span className="film-runtime">{Runtime}</span>
          <span className="film-genre">{Genre}</span>
          <span className="watchlist-button" onClick={(e) => handleClick(metaInfo, e)}><span className="action-symbol">{action.symbol}</span> {action.text}</span>
        </div>

        <div className="film-meta-info-container-desktop">
          <div className="top-row">
            <span className="film-title">{Title}</span>
            <div className="rating-container">
              <StarIcon />
              <span className="film-rating">{imdbRating}</span>
            </div>
          </div>
          <div className="center-row">
            <span className="film-runtime">{Runtime}</span>
            <span className="film-genre">{Genre}</span>
            {
              !filmInWatchlist ? 
              <motion.span 
                className="watchlist-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1 }}
                onClick={handleAction}
              >
                <span className="action-symbol">
                  {action.symbol}
                </span>
                {action.text}
              </motion.span>
              :
              <motion.span 
                className="watchlist-button--disabled"
              >
                In Watchlist
              </motion.span>
            }
          </div>
        </div>

        <div className="film-description-container">
          <p className="film-description">{Plot}</p>
        </div>
      </motion.div>
      <div className="border-bottom"></div>
    </>
  )
}

export default FilmContainer;