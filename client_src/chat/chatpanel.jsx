import React from 'react';
import { Link, Redirect } from 'react-router'
import { apiRequest } from '../utils/request.js'


export default class ChatPanel extends React.Component {

  constructor(props){
    console.log('CONSTR');
    super(props);
    this.state = {
      tab: 'contacts',
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

  // mainContent(){
  //   if(this.state.tab == "contacts"){
  //     return this.departmentList()
  //   }
  //   else {
  //     return 'another state'
  //   }
  // }

  onClickContact(){
    var that = this;
    return function() {
      that.state.tab = 'contacts'

    }
  }

  onClickDialogs(){
    var that = this;
    return function() {
      that.setState({tab:'dialogs'})

    }
  }

  render() {
    console.log(this.departmentList());
    console.log('reload chat panel ' + this.state.tab );
    return (
      <div>
        <div className='row'>
          <div className='col-xs-6'>
            <span className='glyphicon glyphicon-comment' onClick={this.onClickDialogs()}></span>
           </div>
           <div className='col-xs-6'>
            <span className='glyphicon glyphicon-book'  onClick={this.onClickContact()}></span>
          </div>

         </div>
        <div>
          <div style={{display:"none"}}>
            { this.departmentList() }
          </div>
          <div> another state </div>
        </div>
      </div>
    )
  }

}

ChatPanel.contextTypes = {
  router: React.PropTypes.object.isRequired
}
