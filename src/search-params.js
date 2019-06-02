import React from "react";
import SearchBox from "./search-box";
import { navigate } from "@reach/router";

class SearchParams extends React.Component {
  handleSearchSubmit() {
    navigate("/");
  }
  render() {
    return <SearchBox search={this.handleSearchSubmit} />;
  }
}

export default SearchParams;
