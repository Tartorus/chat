import React from 'react';
import { Link, Redirect } from 'react-router'
import Reg from '../registration/registration.jsx'

export default class Chat extends React.Component {


  componentWillMount(){
    let userCookie = document.cookie;
    if (userCookie){
      console.log('TRUE');
    }
    else {
      console.log('False');
      this.context.router.push('loggin')
    }
  }

   render() {
      return (
        <div>
          CHAT
      </div>
      );
   }
}

Chat.contextTypes = {
  router: React.PropTypes.object.isRequired
}
