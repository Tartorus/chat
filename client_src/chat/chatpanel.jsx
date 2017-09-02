import React from 'react';
import { Link, Redirect } from 'react-router'
import { apiRequest } from '../utils/request.js'
import CPTooBar from './chatpanel_toolbar.jsx'
import CPDialog from './chatpanel_dialog.jsx'
import CPContacts from './chatpanel_contacts.jsx'

// управляющий компонент боковой панели.
export default class ChatPanel extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      tab: 'contacts'
    }
  }



  changeTab(){
    var that = this;
    return function(value) {
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
    }}
  }


  render() {
    console.log('render ChatPanel ' + this.props.activeDialog);
    return (
      <div>
        <CPTooBar tab={this.state.tab} changeTab={this.changeTab()}/>
          <div>
            <div id='contacts'>
                <CPContacts changeTab={this.changeTab()} userDialogsMap={this.props.userDialogsMap} departments={this.props.departments} updateUserDialogs = {this.props.updateUserDialogs} selectDialog={this.props.selectDialog}/>
            </div>
            <div id='dialogs' style={{display:'none'}}>
               <CPDialog
                 dialogs={this.props.userDialogs}
                 activeDialog={this.props.activeDialog}
                 selectDialog={this.props.selectDialog}
               />
           </div>
          </div>
      </div>
    )
  }

}

ChatPanel.contextTypes = {
  router: React.PropTypes.object.isRequired
}
