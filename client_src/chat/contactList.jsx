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


  userList(depId, users){
    return(
        <ul key={depId}>
        {users.map(user=><li key={user.id}> {user.name}</li>)}
        </ul>
    )
  }


  departmentList(){
    return(
      this.state.departments.map(dep =>
        <div key={dep.id}>{dep.name} {this.userList(dep.id, dep.users)}</div>
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
