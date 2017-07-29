import React from 'react';
import { Link, Redirect } from 'react-router'
import { apiRequest, appUrls } from '../utils/request.js'
import ChatPanel from './chatpanel.jsx'


export default class Chat extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      departments: [],
      dialogs: [],
      userDialogsMap: {}
    }
  }

  updateUserDialogs(){
    var that = this;
    return function (newDialogs) {
      that.setState({dialogs:newDialogs})
    }
  }

  componentWillMount(){
    var response = apiRequest(appUrls['departmentList'], 'get', null, {'user':false})
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
      .then(data => {
        console.log(data);
        this.setState({departments:data})
      });

    apiRequest(appUrls['dialogList'] ,'get')
      .then(response =>
        {  if (response.status == 200){
            return response.json();
          }
          else {
              throw Error(response.statusText);
          }
        }
      ).catch(error => {
        console.error(error);
      })
      .then(data => {
        this.setState({dialogs:data});
        let _userDialogsMap = {};

        for (var i = 0; i < data.length; i++) {
          let dialog = data[i];

          for (var j = 0; j < dialog.members.length; j++) {
            if (dialog.group === false){
              _userDialogsMap[dialog.members[j].user] = dialog
            }
          }
        }
        this.setState({userDialogsMap: _userDialogsMap})
      })
    };

  logout(event){
    apiRequest(appUrls['userLogout'], 'post', {})
    .then(
      response=>{
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
            <ChatPanel departments={this.state.departments} userDialogs={this.state.dialogs} userDialogsMap={this.state.userDialogsMap} updateUserDialogs = {this.updateUserDialogs()}/>
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
