import React from 'react';
import { Link, Redirect } from 'react-router'
import { apiRequest } from '../utils/request.js'
import ContactList from './contactList.jsx'


export default class Chat extends React.Component {

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
        <div className='row'>

          <div className='col-xs-3'>
            <ContactList/>
          </div>

          <div className='col-xs-9 chatWindow'> dialogs </div>
          <p><button onClick={this.logout.bind(this)}>logout</button></p>
        </div>
      );
   }
}

Chat.contextTypes = {
  router: React.PropTypes.object.isRequired
}
