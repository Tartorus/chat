import React from 'react';
import { apiRequest } from '../app.conf.js'

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
    // console.log(SERVER_IP);
    apiRequest('loggin', 'post', {})
  }

   render() {
      return (
         <div>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <input placeholder='login' type='text' value={this.state.login} onChange={this.handleChange.bind(this)('login')}/>
              <p><input placeholder='password' type='password' value={this.state.password} onChange={this.handleChange.bind(this)('password')}/></p>
              <p><input type='submit' value='Отправить'/></p>
            </form>
         </div>
      );
   }
}
