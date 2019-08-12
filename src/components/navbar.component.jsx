import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/authentication';
import LoginTab from './loginTab.component';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.onClickLogout = this.onClickLogout.bind(this);
  }

  onClickLogout() {
    const { cookies } = this.props;
    const token = cookies.get('token');
    const user = cookies.get('user');
    axios
      .post('http://localhost:3000/users/logout', {
        token,
        user
      })
      .then(response => {
        cookies.remove('token');
        cookies.remove('user');
        this.props.dispatch(logout(cookies.get('token')));
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }

  render() {
    return (
      <header>
        <span>Questionary</span>
        {this.props.cookies.get('token') ? (
          <button onClick={this.onClickLogout}>Logout</button>
        ) : (
          <LoginTab cookies={this.props.cookies} />
        )}
      </header>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    state: state,
    cookies: ownProps.cookies
  };
};

export default connect(mapStateToProps)(Navbar);
