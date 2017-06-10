import React from 'react';
import { Link, Redirect } from 'react-router'
import { apiRequest } from '../utils/request.js'
import Reg from '../registration/registration.jsx'

export default class Chat extends React.Component {


  componentWillMount(){
    let userCookie = document.cookie;
    // TODO кукпи ставятся только со
    if (!userCookie){
      this.context.router.push('login')
    }
  }

  logout(event){
    apiRequest('logout', 'post', {})
    .then(
      response=>{
        console.log('logout');
        if(response.status==200){
          this.context.router.push('login')
        }
        else {
          console.log('logout error');
        }
      }
    )
  }

   render() {
      return (
        <div>
          CHAT
          <p><button onClick={this.logout.bind(this)}>logout</button></p>
      </div>
      );
   }
}

Chat.contextTypes = {
  router: React.PropTypes.object.isRequired
}
