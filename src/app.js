import React from "react";
import { render } from "react-dom";
import Results from "./results";
import { Router } from "@reach/router";
import Details from "./details";
import SearchParams from "./search-params";
import pf from "petfinder-client";
import { Provider } from "./search-context";
import NavBar from "./nav-bar";
const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      animal: "",
      breed: "",
      breeds: [],
      handleLocationChange: this.handleLocationChange.bind(this),
      handleAnimalChange: this.handleAnimalChange.bind(this),
      handleBreedChange: this.handleBreedChange.bind(this),
      getBreeds: this.getBreeds.bind(this)
    };
  }
  handleLocationChange = event => {
    //That is because of React doing event polling - all the event's fields get nullified after the callback is done,
    //so you observe them as nulls in the asynchronous setState callback.

    event.persist();

    this.setState({
      location: event.target.value
    });
  };

  handleAnimalChange = event => {
    this.setState(
      {
        animal: event.target.value,
        breed: ""
      },
      this.getBreeds
    );
  };

  handleBreedChange = event => {
    this.setState({ breed: event.target.value });
  };

  getBreeds() {
    if (this.state.animal) {
      petfinder.breed.list({ animal: this.state.animal }).then(data => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          this.setState({
            breeds: data.petfinder.breeds.breed
          });
        }
      });
    } else {
      this.setState({ breeds: [] });
    }
  }
  render() {
    return (
      <div>
        <NavBar />
        <Provider value={this.state}>
          <Router>
            <Results path="/" />
            <Details path="/details/:id" />
            <SearchParams path="/search" />
          </Router>
        </Provider>
      </div>
    );
  }
}

render(<App />, document.getElementById("app"));
