import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class LoginTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: ''
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.name, this.state.password);
    axios
      .post('http://localhost:3000/users/login', {
        user: {
          input: this.state.name,
          password: this.state.password
        }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log('here', error.response.data);
        console.log(error);
      });
  }

  onNameChange(e) {
    const name = e.target.value;
    this.setState(() => ({ name }));
  }

  onPasswordChange(e) {
    const password = e.target.value;
    this.setState(() => ({ password }));
  }

  render() {
    return (
      <div>
        <NavLink to="/register" exact={true}>
          register
        </NavLink>

        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="username/email"
            value={this.state.name}
            onChange={this.onNameChange}
          />
          <input
            placeholder="password"
            type="password"
            value={this.state.password}
            onChange={this.onPasswordChange}
          />
          <button>login</button>
        </form>
      </div>
    );
  }
}
