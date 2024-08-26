import React from "react";
import "../css/MovieCard.css";

const MovieCardList = ({ movies }) => {
  const { title, movie_id, pics } = movies;

  return (
    <div className="movie-card-list">
      {title.map((movieTitle, index) => (
        <div key={movie_id[index]} className="movie-card">
          <img src={pics[index]} alt={movieTitle} className="movie-image" />
          <h3 className="movie-name">{movieTitle}</h3>
        </div>
      ))}
    </div>
  );
};

export default MovieCardList;
