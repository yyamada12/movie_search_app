import React, { useState, useEffect } from "react";
import Header from "./Header";
import Search from "./Search";
import Movie from "./Movie";
import "../App.css";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=Harry Potter&apikey=4a3b711b";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      });
  }, []);

  const search = (searchValue: string) => {
    setLoading(true);
    setErrorMessage(null);
    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
        } else {
          setErrorMessage(jsonResponse.Error);
        }
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <Header text="Hooked" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((m, i) => <Movie key={i} movie={m} />)
        )}
      </div>
    </div>
  );
};

export default App;
