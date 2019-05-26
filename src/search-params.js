import React from "react";

class SearchParams extends React.Component {
  state = {
    location: "",
    animal: "",
    breed: ""
  };

  handleLocationChange = event => {
    //That is because of React doing event polling - all the event's fields get nullified after the callback is done,
    //so you observe them as nulls in the asynchronous setState callback.

    event.persist();

    this.setState({
      location: event.target.value
    });
  };

  render() {
    return (
      <div className="search-params">
        <label htmlFor="location">
          location
          <input
            onChange={this.handleLocationChange}
            id="location"
            value={this.state.location}
            placeholder="location"
          />
        </label>
      </div>
    );
  }
}

export default SearchParams;
