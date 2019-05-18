import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Project from "./components/Project";

class App extends Component {
  state = {
    projects: []
  };

  componentDidMount = () => {
    axios
      .get("http://localhost:9090/api/projects/")
      .then(response => {
        console.log(response);
        this.setState({ projects: response.data });
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {this.state.projects.map(project => {
            return (
              <Project
                id={project.id}
                completed={project.completed}
                description={project.description}
                name={project.name}
              />
            );
          })}
        </header>
      </div>
    );
  }
}

export default App;
