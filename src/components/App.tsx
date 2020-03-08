import React from "react";
import Header from "./Header";
import Search from "./Search";
import Movie from "./Movie";
import "../App.css";

function App() {
  const movies = [
    {
      Title: "Iron Man",
      Year: "2008",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg"
    }
  ];
  return (
    <div className="App">
      <Header text="Hooked" />
      <Search search={searchValue => {}} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {movies.map((m, i) => (
          <Movie key={i} movie={m} />
        ))}
      </div>
    </div>
  );
}

export default App;
