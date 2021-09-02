import axios from 'axios';
import React, { Component } from 'react';

export default class AddTreasure extends Component {
  constructor() {
    super();
    this.state = {
      treasureURL: '',
    };
  }

  handleInput(e) {
    this.setState({ treasureURL: e.target.value });
  }

  addTreasure() {
    // post to /api/treasure/user here
    const { treasureURL } = this.state;
    axios.post('/api/treasure/user', { treasureURL: treasureURL })
      .then(({ data }) => {
        this.props.addMyTreasure(data);
        this.setState({ treasureURL: '' })
      })
      .catch(error => {
        console.log(error);
        alert(error.response.request.response);
      });
  }

  render() {
    return (
      <div className="addTreasure">
        <input
          type="text"
          placeholder="Add image URL"
          onChange={e => this.handleInput(e)}
          value={this.state.treasureURL}
        />
        <button onClick={() => this.addTreasure()}>Add</button>
      </div>
    );
  }
}
