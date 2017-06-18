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
    apiRequest('user/', 'post',
     {
       login:this.state.login,
       password:this.state.password,
       name:this.state.name,
       surname:this.state.surname,
       email:this.state.email,
       department:this.state.department,
     }
   ).then(response=>{
     if(response.status==201){
       console.log('login');
       this.context.router.push('login')
     }
     else {
      //  TODO напистаь сообщениео об ошибке
       console.log('fail');
     }
   })
  }

   render() {
      return (
        // TODO кнопка отправить должна быть активной после заполнения всех полей формы
        <div className='registerForm'>
          <div className='col-md-3'></div>
          <div className='col-md-6'>
           <form onSubmit={this.handleSubmit.bind(this)} name='RegisterForm' className='form-group'>
             <label for='login'>Login</label> <input id='login' placeholder='login' className='form-control' type='text' value={this.state.login} onChange={this.handleChange.bind(this)('login')}/>
             <p> <label for='password'>Password</label> <input id='password' placeholder='password' className='form-control' type='password' value={this.state.password} onChange={this.handleChange.bind(this)('password')}/></p>
             <p> <label for='name'>Name</label> <input id='name' placeholder='name' className='form-control' type='text' value={this.state.name} onChange={this.handleChange.bind(this)('name')}/></p>
             <p> <label for='Surname'>Surname</label> <input id='Surname' placeholder='surname' className='form-control' type='text' value={this.state.surname} onChange={this.handleChange.bind(this)('surname')}/></p>
             <p> <label for='Email'>Email</label> <input id='Email' placeholder='email' className='form-control' type='text' value={this.state.email} onChange={this.handleChange.bind(this)('email')}/></p>
             <p> <label for='Department'>Department</label> <input id='Department' placeholder='department' className='form-control' type='text' value={this.state.department} onChange={this.handleChange.bind(this)('department')}/></p>
             <p><input type='submit' className='btn btn-default'/></p>
           </form>
         </div>
         <div className='col-md-3'></div>
        </div>
      );
   }
}

Reg.contextTypes = {
  router: React.PropTypes.object.isRequired
}
