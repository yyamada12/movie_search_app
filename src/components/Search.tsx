import React, { useState } from "react";

interface IProps {
  search: (searchValue: string) => void;
}

const Search = (props: IProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  };

  return (
    <form className="search">
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <input onClick={callSearchFunction} type="submit" value="SEARCH" />
    </form>
  );
};

export default Search;
