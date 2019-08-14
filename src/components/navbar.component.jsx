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

  async onClickLogout() {
    try {
      const { cookies } = this.props;
      const token = cookies.get('token');
      const user = cookies.get('user');
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/logout`,
        {
          token,
          user
        }
      );

      cookies.remove('token');
      cookies.remove('user');
      this.props.dispatch(logout(cookies.get('token')));
      console.log('Logged out');
    } catch (error) {
      console.log('Error logging out', error);
    }
  }

  render() {
    return (
      <header>
        <span>Questionary</span>
        {this.props.logged ? (
          <button onClick={this.onClickLogout}>Logout</button>
        ) : (
          <LoginTab cookies={this.props.cookies} />
        )}
      </header>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { cookies } = ownProps.cookies;
  console.log(cookies.user);
  return {
    state: state,
    cookies: ownProps.cookies,
    logged: !!cookies.token
  };
};

export default connect(mapStateToProps)(Navbar);
