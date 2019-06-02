import React from "react";
import pf from "petfinder-client";
import { navigate } from "@reach/router";
import Carousel from "./carousel";
import Modal from "./modal";
const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});
class Details extends React.Component {
  state = { loading: true, showModal: false };

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
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
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
          <button onClick={this.toggleModal}>Adopt {name}</button>
          <p>{description}</p>
        </div>
        {this.state.showModal ? (
          <Modal>
            <h1>Would you like to adopt {name}?</h1>
            <div className="buttons">
              <button onClick={this.toggleModal}>Yes</button>
              <button onClick={this.toggleModal}>No</button>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default Details;
