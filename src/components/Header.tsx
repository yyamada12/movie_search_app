import React from "react";

interface IProps {
  text: string;
}

const Header = (props: IProps) => {
  return (
    <header className="App-header">
      <h2>{props.text}</h2>
    </header>
  );
};

export default Header;
