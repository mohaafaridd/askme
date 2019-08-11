import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Components
import NavbarComponent from '../components/navbar.component';

// Pages
import RegisterPage from '../pages/RegisterPage';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <NavbarComponent />
      <Switch>
        <Route path="/register" component={RegisterPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
