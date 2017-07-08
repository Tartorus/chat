import React from 'react';
import { Link, Redirect } from 'react-router'
import { apiRequest } from '../utils/request.js'
import CPTooBar from './chatpanel_toolbar.jsx'

export default class ChatPanel extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      tab: 'contacts'
    }
  }

  openDialog(user){
    return function() {
      console.log(user.id);
    }
  }

  departmentList(){
    return(
      this.props.departments.map(dep =>
        <div key={dep.id}>

          <span data-toggle='collapse' data-target={'#ul' + dep.id} className='glyphicon glyphicon-expand'> {dep.name} </span>
          <div  className='collapse' id={'ul' + dep.id}>
            <ul key={dep.id}>
              {
                dep.users.map(user=>
                  <li key={user.id} onClick={this.openDialog(user)}>{user.name} {user.surname}</li>
                )
              }
            </ul>
          </div>
        </div>
      )
  )}

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
    console.log(this.departmentList());
    console.log('reload chat panel ' + this.state.tab );
    return (
      <div>
        <CPTooBar tab={this.state.tab} contactButton={this.onClickTab('contacts')} dialogButton={this.onClickTab('dialogs')}/>
          <div>
            <div id='contacts'>
              { this.departmentList() }
            </div>
            <div id='dialogs' style={{display:'none'}}> dialog list </div>
          </div>
      </div>
    )
  }

}

ChatPanel.contextTypes = {
  router: React.PropTypes.object.isRequired
}
