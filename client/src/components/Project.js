import React, { Component } from "react";
import axios from "axios";
import Action from "./Action";

class Project extends Component {
  state = {
    nameClicked: false,
    actions: []
  };

  handleClickName = () => {
    this.setState({ nameClicked: !this.state.nameClicked });
    axios
      .get(`http://localhost:9090/api/projects/actions/${this.props.id}`)
      .then(response => {
        this.setState({ actions: response.data });
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <h1 className="theName" onClick={this.handleClickName}>
          {this.props.name}
        </h1>
        {this.state.nameClicked && (
          <div>
            <p>
              {" "}
              id: {this.props.id}
              description: {this.props.description}
              completed? {this.props.completed}
              actions:{" "}
              {this.state.actions.map(action => {
                return (
                  <Action
                    id={action.id}
                    completed={action.completed}
                    description={action.description}
                    notes={action.notes}
                  />
                );
              })}
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Project;
