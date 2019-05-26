import React from "react";
import { render } from "react-dom";
import Results from "./results";
import { Router, Link } from "@reach/router";
import Details from "./details";
import SearchParams from "./search-params";

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Link to="/">NBA Game</Link>
        </header>
        <Router>
          <Results path="/" />
          <Details path="/details/:id" />
          <SearchParams path="/search" />
        </Router>
      </div>
    );
  }
}

render(<App />, document.getElementById("app"));
