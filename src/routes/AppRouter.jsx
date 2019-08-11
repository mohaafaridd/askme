import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Components

// Pages
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <h1>Hello World</h1>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
