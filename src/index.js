import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

export default class App extends Component {
  state = {
    loading: true,
    ranJoke: "",
    data: [],
    categoriesURL: "https://api.chucknorris.io/jokes/categories",
    jokeURL: "https://api.chucknorris.io/jokes/random?category?="
  };

  componentDidMount = () => {
    this.retrieveCategories();
  };

  retrieveCategories = async () => {
    const response = await fetch(this.state.categoriesURL);
    response.json().then(data => {
      this.setState({ data });
    });
  };

  getRanJoke = async category => {
    const response = await fetch(`${this.state.jokeURL}${category}`);
    response
      .json()
      .then(test => {
        this.setState({ ranJoke: test.value });
      })
      .catch(err => {
        console.info(err);
      });
  };

  renderListItems = data => {
    return Object.keys(data).map(key => {
      const category = data[key];
      return (
        <button key={key} onClick={() => this.getRanJoke(category)}>
          {category}
        </button>
      );
    });
  };

  render = () => {
    return (
      <div>
        {this.state.data.length === 0
          ? "loading"
          : this.renderListItems(this.state.data)}
        <div>{this.state.ranJoke}</div>
      </div>
    );
  };
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
