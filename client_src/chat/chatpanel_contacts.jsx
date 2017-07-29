import React from 'react';
import { Link, Redirect } from 'react-router'
import { apiRequest, appUrls } from '../utils/request.js'


export default class CPContacts extends React.Component {

  constructor(props){
      super(props);
  }

  openDialog(user){
    let that = this;
    return function() {
      let userDialogsMap = that.props.userDialogsMap;
      if (userDialogsMap[user.id] === undefined){
        apiRequest(appUrls['dialogList'], 'post', {'users': [user.id]})
      }
      else {
        console.log(userDialogsMap[user.id]);
      }

    }
  }

  render(){
    console.log('render CPContacts');
    return(
      <div>

        {this.props.departments.map(dep =>
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
        )}
    </div>
    )
  }

}
