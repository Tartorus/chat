import React from 'react';
import { Link, Redirect } from 'react-router'
import { apiRequest, appUrls } from '../utils/request.js'
import ChatPanel from './chatpanel.jsx'
import ChatWindow from './chatwindow.jsx'

// Основной управляющий копнент чата, содержащий в себе компоненты окна чата и бокой панели
export default class Chat extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      departments: [],
      dialogs: [],
      userDialogsMap: {},
      activeDialog: null,
      dialogMessageMap: {}
    }
  }

  selectDialog(){
    var that = this;
    return function(dialog_id) {
      return function(){
        that.setState({activeDialog: dialog_id})
      }
    }
  }

  updateUserDialogs(){
    // Обновление списка диалогов пользователя.
    // newDialogs: [{ }, ]
    var that = this;
    return function (newDialogs) {

      console.log(newDialogs);
      that.setState({dialogs:newDialogs})
      that.updateUserDialogsMap(newDialogs);
    }
  }

  updateUserDialogsMap(dialogs){
    //
    let _userDialogsMap = {};

    for (var i = 0; i < dialogs.length; i++) {
      let dialog = dialogs[i];

      for (var j = 0; j < dialog.members.length; j++) {
        if (dialog.group === false){
          _userDialogsMap[dialog.members[j].user] = dialog
        }
      }
    }
    this.setState({userDialogsMap: _userDialogsMap})
  }

  componentWillMount(){
    // get departmentList
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
    // get dialogList
    apiRequest(appUrls['dialogList'] ,'get')
      .then(response =>{
        switch (response.status) {
          case 200:
          return response.json();
          case 403:
          this.context.router.push('/login')
          break;
          default:
          throw Error(response.statusText);
        }
      })
      .catch(error => {
        console.error(error);
      })
      .then(data => {
        this.setState({dialogs:data});
        this.updateUserDialogsMap(data);

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
            <ChatPanel selectDialog={this.selectDialog()}
               departments={this.state.departments}
               userDialogs={this.state.dialogs}
               userDialogsMap={this.state.userDialogsMap}
               updateUserDialogs = {this.updateUserDialogs()}
               activeDialog = {this.state.activeDialog}
             />
          </div>

          <div className='col-xs-9 chatWindow'> <ChatWindow/> </div>
          <p><button onClick={this.logout.bind(this)}>logout</button></p>
        </div>
      );
   }
}

Chat.contextTypes = {
  router: React.PropTypes.object.isRequired
}
