import React, { Component } from "react";
import axios from "axios";
import Action from "./Action"

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
        <div className="theName" onClick={this.handleClickName}>
          {this.props.name}
        </div>
        {this.state.nameClicked && (
          <div>
            <p> id: {this.props.id}</p>
            <p>description: {this.props.description}</p>
            <p>completed? {this.props.completed} </p>
            <p>
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
