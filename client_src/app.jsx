import React from 'react';
import { Link, Redirect } from 'react-router'
import Reg from './registration/registration.jsx'

export default class App extends React.Component {


   render() {
      return (
        <div>
          MAIN
          {this.props.children}
        </div>
      );
   }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
}
