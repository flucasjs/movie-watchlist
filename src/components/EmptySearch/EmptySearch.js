import React from "react";
import FilmIcon from "../FilmIcon";
import "./EmptySearch.css";

const EmptySearch = ({searchStatus}) => {
  return (
    <div className="container">
      <FilmIcon />
      {
        (searchStatus) ?
        <h2>Start Exploring</h2>
        :
        <h2>Unable to find what you’re looking for. Please try another search.</h2>
      }
    </div>
  )
}

export default EmptySearch;