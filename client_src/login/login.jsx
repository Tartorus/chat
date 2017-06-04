import React from 'react';
import { Link } from 'react-router'
import { apiRequest } from '../utils/request.js'

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: ''
    };

  }

  handleChange(state) {
    let that = this;
    return function(event) {
      let _state = {};
      _state[state] =  event.target.value
      that.setState(_state);
    }
}

  handleSubmit(event) {
    event.preventDefault();
    apiRequest('user/login', 'post',
     {
       login:this.state.login,
       password:this.state.password
     }
   ).then(response=>{
     console.log(response.status);
     if(response.status==200){
       this.context.router.push('/')
     }
     else {
       console.log('fail');
     }
   })
  }

   render() {
      return (
         <div>
            <form onSubmit={this.handleSubmit.bind(this)} name='loginForm'>
              <input placeholder='login' type='text' value={this.state.login} onChange={this.handleChange.bind(this)('login')}/>
              <p><input placeholder='password' type='password' value={this.state.password} onChange={this.handleChange.bind(this)('password')}/></p>
              <p><input type='submit' value='loggin'/><Link to={'registration'}>Registration</Link></p>
            </form>
         </div>
      );
   }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
}
