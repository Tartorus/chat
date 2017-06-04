import React from 'react';
import { apiRequest } from '../utils/request.js'

//  TODO валидация полей
export default class Reg extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      name: '',
      surname: '',
      email: '',
      department: ''
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
    apiRequest('user/register', 'post',
     {
       login:this.state.login,
       password:this.state.password,
       name:this.state.name,
       surname:this.state.surname,
       email:this.state.email,
       department:this.state.department,
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
           <form onSubmit={this.handleSubmit.bind(this)} name='RegisterForm'>
             Login: <input placeholder='login' type='text' value={this.state.login} onChange={this.handleChange.bind(this)('login')}/>
             <p> Password: <input placeholder='password' type='password' value={this.state.password} onChange={this.handleChange.bind(this)('password')}/></p>
             <p> Name: <input placeholder='name' type='text' value={this.state.name} onChange={this.handleChange.bind(this)('name')}/></p>
             <p> Surname: <input placeholder='surname' type='text' value={this.state.surname} onChange={this.handleChange.bind(this)('surname')}/></p>
             <p> Email: <input placeholder='email' type='text' value={this.state.email} onChange={this.handleChange.bind(this)('email')}/></p>
             <p> Department: <input placeholder='department' type='text' value={this.state.department} onChange={this.handleChange.bind(this)('department')}/></p>
             <p><input type='submit'/></p>
           </form>
        </div>
      );
   }
}
