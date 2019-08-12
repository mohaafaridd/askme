import React from 'react';
import { connect } from 'react-redux';

import LoginTab from './loginTab.component';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: ''
    };

    //get this.props.cookies
    const { cookies } = this.props;
    this.token = cookies.get('token');
    console.log('this.token :', this.token);
  }

  render() {
    return (
      <header>
        <span>Questionary</span>
        {this.token ? (
          <h1>Welcome</h1>
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
