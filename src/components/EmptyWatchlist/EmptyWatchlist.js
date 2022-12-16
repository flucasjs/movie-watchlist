import React from "react";
import { Link } from "react-router-dom";
import "./EmptyWatchlist.css";

const EmptyWatchlist = ({togglePage}) => {
  return (
    <div className="container">
      <h2>Your watchlist is looking a little empty...</h2>
      <div className="add-container">
        <Link to="/movie-watchlist/">
          <span className="circle plus"></span>
        </Link>
        <h3>Let's add some movies!</h3>
      </div>
    </div>
  )
}

export default EmptyWatchlist;