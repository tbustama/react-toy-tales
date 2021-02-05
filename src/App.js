import React from "react";
import "./App.css";

import Header from "./components/Header";
import ToyForm from "./components/ToyForm";
import ToyContainer from "./components/ToyContainer";

class App extends React.Component {
  state = {
    display: false,
    toys: [],
  };

  handleClick = () => {
    let newBoolean = !this.state.display;
    this.setState({
      display: newBoolean,
    });
  };

  componentDidMount() {
    fetch("http://localhost:3000/toys")
      .then((resp) => resp.json())
      .then((toys) =>
        this.setState({
          toys: toys,
        })
      );
  }

  deleteToy = (id) => {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "DELETE",
    }).then(this.componentDidMount());
  };

  createNewToy = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: e.target.name.value,
        image: e.target.image.value,
        likes: 0,
      }),
    })
      .then((resp) => resp.json())
      .then((toy) =>
        this.setState({
          toys: [...this.state.toys, toy],
        })
      )
      .then(e.target.reset());
  };

  render() {
    return (
      <>
        <Header />
        {this.state.display ? (
          <ToyForm createNewToy={this.createNewToy} />
        ) : null}
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} delete={this.deleteToy} />
      </>
    );
  }
}

export default App;
