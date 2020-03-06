import React from "react";
import Header from "./Header";
import Search from "./Search";
import "../App.css";

function App() {
  return (
    <div className="App">
      <Header text="Hooked" />
      <Search search={searchValue => {}} />
    </div>
  );
}

export default App;
