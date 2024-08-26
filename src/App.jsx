import React, { useState, useEffect } from "react";
import SearchBox from "./components/search";
import MovieCardList from "./components/card";
import Login from "./components/login";
import Registration from "./components/registration";
import { fetchMovieData } from "./components/api_handler";
import "./css/app.css";

const App = () => {
  const [movies, setMovies] = useState({ title: [], movie_id: [], pics: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [movieName, setMovieName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const getMovieData = async () => {
      if (!movieName) return;

      try {
        const data = await fetchMovieData(movieName);
        setMovies({
          title: data.title || [],
          movie_id: data.movie_id || [],
          pics: data.pics || [],
        });
        setLoading(false);
      } catch (error) {
        setError("Failed to load movie data. Please try again.");
        setLoading(false);
      }
    };

    getMovieData();
  }, [movieName]);

  const handleSearch = (name) => {
    setError("");
    setMovieName(name);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <>
          {isLogin ? (
            <>
              <Login onLogin={handleLogin} />
              <div className="auth-toggle">
                Don't have an account?{" "}
                <button onClick={toggleAuthMode}>Register</button>
              </div>
            </>
          ) : (
            <>
              <Registration />
              <div className="auth-toggle">
                Already have an account?{" "}
                <button onClick={toggleAuthMode}>Login</button>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <SearchBox onSearch={handleSearch} />
          {error && <p className="error-message">{error}</p>}
          {loading ? (
            <p>Loading...</p>
          ) : movies.title.length > 0 ? (
            <MovieCardList movies={movies} />
          ) : (
            <p>No movies found</p>
          )}
        </>
      )}
    </div>
  );
};

export default App;
