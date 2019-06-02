import React from "react";
import { ANIMALS } from "petfinder-client";
import { Consumer } from "./search-context";
class SearchBox extends React.Component {
  handleFormSubmit = event => {
    event.preventDefault();
    this.props.search();
  };
  render() {
    return (
      <Consumer>
        {consumer => {
          const { location, breeds } = consumer;
          return (
            <div className="search-params">
              <form onSubmit={this.handleFormSubmit}>
                <label htmlFor="location">
                  location
                  <input
                    onChange={consumer.handleLocationChange}
                    id="location"
                    value={location}
                    placeholder="location"
                  />
                </label>
                <label htmlFor="animal">
                  animal
                  <select
                    onChange={consumer.handleAnimalChange}
                    onBlur={consumer.handleAnimalChange}
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
                    onChange={consumer.handleBreedChange}
                    onBlur={consumer.handleBreedChange}
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
                <button type="submit">Submit</button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default SearchBox;
