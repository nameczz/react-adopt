import React from "react";
import pf from "petfinder-client";
import { navigate } from "@reach/router";
import Carousel from "./carousel";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});
class Details extends React.Component {
  state = { loading: true };

  componentDidMount() {
    petfinder.pet
      .get({ output: "full", id: this.props.id })
      .then(res => {
        let breed;
        let pet = res.petfinder.pet;
        if (Array.isArray(pet.breeds.breed)) {
          breed = pet.breeds.breed.join(",");
        } else {
          breed = pet.breeds.breed;
        }
        this.setState({
          name: pet.name,
          animal: pet.animal,
          location: `${pet.contact.city}, ${pet.contact.state}`,
          description: pet.description,
          media: pet.media,
          breed,
          loading: false
        });
      })
      .catch(() => {
        navigate("/");
      });
  }
  render() {
    if (this.state.loading) {
      return (
        <div>
          <div>loading</div>
        </div>
      );
    }
    const { name, animal, location, description, media, breed } = this.state;
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal}-{breed}-{location}
          </h2>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Details;
