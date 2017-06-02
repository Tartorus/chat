import React from 'react';
import { apiRequest } from '../utils/request.js'

export default class Loggin extends React.Component {

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
     if(response.status==200){
       console.log(response.status);
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
              <p><input type='submit' value='Отправить'/></p>
            </form>
         </div>
      );
   }
}
