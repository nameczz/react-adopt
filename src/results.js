import React from "react";
import pf from "petfinder-client";
import Pet from "./pet";
import SearchBox from "./search-box";
import { Consumer } from "./search-context";
const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});
petfinder.find();
class Results extends React.Component {
  constructor(props) {
    super(props);

    // init state
    this.state = {
      pets: []
    };
  }

  componentDidMount() {
    this.search();
  }

  search = () => {
    const { location, animal, breed } = this.props.searchParams;
    petfinder.pet
      .find({ output: "full", location, animal, breed })
      .then(data => {
        let pets;
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }

        // shallow merge
        this.setState({
          pets
        });
      });
  };

  render() {
    return (
      <div>
        <h2>Worriors</h2>
        <SearchBox search={this.search} />
        {this.state.pets.map(pet => {
          let breed;
          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(", ");
          } else {
            breed = pet.breeds.breed;
          }

          return (
            <Pet
              key={pet.id}
              name={pet.name}
              animal={pet.animal}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
              id={pet.id}
            />
          );
        })}
      </div>
    );
  }
}

// props 就是原本的一些props
export default function ResultsContext(props) {
  return (
    <Consumer>
      {function(context) {
        return <Results {...props} searchParams={context} />;
      }}
    </Consumer>
  );
}
