import React from 'react';
import { Link, Redirect } from 'react-router'
import { apiRequest } from '../utils/request.js'
import CPTooBar from './chatpanel_toolbar.jsx'
import CPDialog from './chatpanel_dialog.jsx'
import CPContacts from './chatpanel_contacts.jsx'

export default class ChatPanel extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      tab: 'contacts'
    }
  }

  onClickTab(value){
    var that = this;
    return function() {
      that.setState({tab:value})
      var contacts = document.getElementById('contacts');
      var dialogs = document.getElementById('dialogs');
      var turn_off;
      var turn_on;
      if (value == 'contacts'){
        turn_on = contacts;
        turn_off = dialogs;
      }
      else {
        turn_on = dialogs;
        turn_off = contacts;
      }
      turn_on.style.display='block';
      turn_off.style.display='none'
    }
  }


  render() {
    console.log('render ChatPanel');
    return (
      <div>
        <CPTooBar tab={this.state.tab} contactButton={this.onClickTab('contacts')} dialogButton={this.onClickTab('dialogs')}/>
          <div>
            <div id='contacts'>
                <CPContacts userDialogsMap={this.props.userDialogsMap} departments={this.props.departments} updateUserDialogs = {this.props.updateUserDialogs}/>
            </div>
            <div id='dialogs' style={{display:'none'}}> <CPDialog dialogs={this.props.userDialogs}/> </div>
          </div>
      </div>
    )
  }

}

ChatPanel.contextTypes = {
  router: React.PropTypes.object.isRequired
}
