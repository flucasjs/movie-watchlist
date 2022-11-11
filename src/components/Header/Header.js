import "./Header.css"
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom"

const Header = () => {
  const location = useLocation();
  const locationHome = location.pathname === "/";

  return (
    <header>
      <div className="header-text-container">
        <h1 className="title">
          {(locationHome) ? "Find your film" : "My Watchlist"}
        </h1>
        <Link to={(!locationHome) ? "/" : "/my-watchlist/"}>
          <motion.button 
            className={`toggle-page-button`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
          >
            {(locationHome) ? "My Watchlist" : "Search for movies"}
          </motion.button>
        </Link>
      </div>
    </header>
  )
}

export default Header;