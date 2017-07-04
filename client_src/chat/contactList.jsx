import React from 'react';
import { Link, Redirect } from 'react-router'
import { apiRequest } from '../utils/request.js'


export default class ContactList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      departments: []
    }

  }

  componentWillMount(){
    var response = apiRequest('department', 'get')
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

  openDialog(user){
    return function() {
      console.log(user.id);
    }
  }

  departmentList(){
    return(
      this.state.departments.map(dep =>
        <div key={dep.id}>
          <button className='btn btn-info' type='button'
           id={'b' + dep.id} data-toggle='collapse' data-target={'#ul' + dep.id}>

            {dep.name} <span className='caret'></span>

          </button>
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



  render() {
    console.log(this.departmentList());
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

ContactList.contextTypes = {
  router: React.PropTypes.object.isRequired
}
