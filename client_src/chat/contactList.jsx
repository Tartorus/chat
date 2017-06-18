import React from 'react';
import { Link, Redirect } from 'react-router'
import { apiRequest } from '../utils/request.js'
import lodash from 'lodash'


export default class ContactList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      departments: []
    }

  }

  componentWillMount(){
    apiRequest('department', 'get')
      .then(response => response.json())
      .then(data => this.setState({departments:data}))
  }

  openDialog(user){
    return function() {
      console.log(user.id);
    }
  }

  departmentList(){
    return(
      this.state.departments.map(dep =>
        <div key={dep.id}>
          {dep.name}
          <ul key={dep.id}>
            {
              dep.users.map(user=>
                <li key={user.id} onClick={this.openDialog(user)} > {user.name}</li>
              )
            }
          </ul>
        </div>
      )
  )}



  render() {
    return (
      <div>
        <div> icons </div>
        <div>
            {this.departmentList()}
        </div>
      </div>
    )
  }

}
