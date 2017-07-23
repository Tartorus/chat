import React from 'react';
import { Link, Redirect } from 'react-router'
import { apiRequest, appUrls } from '../utils/request.js'
import ChatPanel from './chatpanel.jsx'


export default class Chat extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      departments: []
    }
  }

  componentWillMount(){
    var response = apiRequest(appUrls['departmentList'], 'get')
      .then(response =>
        {
          if (response.status == 200){
            return response.json();
          }
          else {
              throw Error(response.statusText);
          }
        }
      ).catch(error => {
        console.log(error);
        this.context.router.push('login')
      })
      .then(data => this.setState({departments:data}))
  }

  logout(event){
    apiRequest(appUrls['userLogout'], 'post', {})
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
            <ChatPanel departments={this.state.departments}/>
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
