import React from "react";
import pf, { ANIMALS } from "petfinder-client";
const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});
class SearchParams extends React.Component {
  state = {
    location: "",
    animal: "",
    breed: "",
    breeds: []
  };

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
    const { location, breeds } = this.state;
    return (
      <div className="search-params">
        <label htmlFor="location">
          location
          <input
            onChange={this.handleLocationChange}
            id="location"
            value={location}
            placeholder="location"
          />
        </label>
        <label htmlFor="animal">
          animal
          <select
            onChange={this.handleAnimalChange}
            onBlur={this.handleAnimalChange}
            id="animal"
          >
            <option />
            {ANIMALS.map(v => {
              return (
                <option value={v} key={v}>
                  {v}
                </option>
              );
            })}
          </select>
        </label>
        <label htmlFor="breed">
          breed
          <select
            onChange={this.handleBreedChange}
            onBlur={this.handleBreedChange}
            id="breed"
            disabled={!breeds.length}
          >
            <option />
            {breeds.map(v => {
              return (
                <option value={v} key={v}>
                  {v}
                </option>
              );
            })}
          </select>
        </label>
      </div>
    );
  }
}

export default SearchParams;
