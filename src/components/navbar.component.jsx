import React from 'react';

import LoginTab from './loginTab.component';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: ''
    };
  }

  render() {
    return (
      <header>
        <span>Questionary</span>

        <LoginTab />
      </header>
    );
  }
}
