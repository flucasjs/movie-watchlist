import "./Watchlist.css"
import React from "react";
import { motion } from "framer-motion";
import FilmContainer from "../FilmContainer";
import EmptyWatchlist from "../EmptyWatchlist";

const containerVariants = {
  hidden: {
    opacity: 0,
    x: '100vw'
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
    x: '100vw',
    transition: {
      ease: 'easeInOut'
    }
  }
};

const Watchlist = ({watchlist, removeFilmFromWatchlist}) => {
  return (
    <motion.div 
      className="search-page-container"
      variants={containerVariants}
      initial={"hidden"}
      animate="visibile"
      exit="exit"
    >
      {
        (watchlist.length) ?
        <div className="films-container margin-top">
          {
            watchlist.map(film => {
              return (
                <FilmContainer key={film.imdbID} title={film.Title} handleClick={removeFilmFromWatchlist} action={{symbol: "-", text: "Remove"}}/>
              )
            })
          }
        </div>
        :
        <EmptyWatchlist />
      }
    </motion.div>
  )
}

export default Watchlist;