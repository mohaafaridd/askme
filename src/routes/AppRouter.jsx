import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { withCookies } from 'react-cookie';

// Components
import NavbarComponent from '../components/navbar.component';

// Pages
import RegisterPage from '../pages/RegisterPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavbarComponent cookies={this.props.cookies} />
          <Switch>
            <Route path="/register" component={RegisterPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default withCookies(App);
