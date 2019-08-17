import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../redux/actions/authentication';

class LoginTab extends Component {
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

  async onSubmit(e) {
    e.preventDefault();
    const user = { input: this.state.name, password: this.state.password };
    this.props.login(user, this.props.cookies);
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

const mapStateToProps = (state, ownProps) => {
  return {
    state: state,
    cookies: ownProps.cookies
  };
};

export default connect(
  mapStateToProps,
  { login }
)(LoginTab);
