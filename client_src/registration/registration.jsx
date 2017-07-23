import React from 'react';
import { apiRequest, appUrls } from '../utils/request.js'

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
    let data = {
      login:this.state.login,
      password:this.state.password,
      name:this.state.name,
      surname:this.state.surname,
      email:this.state.email,
      department:this.state.department,
    }

    apiRequest(appUrls['user'], 'post', data)
    .then(response=>{
     if(response.status==201){
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
             <label htmlFor='login'>Login</label> <input id='login' placeholder='login' className='form-control' type='text' value={this.state.login} onChange={this.handleChange.bind(this)('login')}/>
             <p> <label htmlFor='password'>Password</label> <input id='password' placeholder='password' className='form-control' type='password' value={this.state.password} onChange={this.handleChange.bind(this)('password')}/></p>
             <p> <label htmlFor='name'>Name</label> <input id='name' placeholder='name' className='form-control' type='text' value={this.state.name} onChange={this.handleChange.bind(this)('name')}/></p>
             <p> <label htmlFor='Surname'>Surname</label> <input id='Surname' placeholder='surname' className='form-control' type='text' value={this.state.surname} onChange={this.handleChange.bind(this)('surname')}/></p>
             <p> <label htmlFor='Email'>Email</label> <input id='Email' placeholder='email' className='form-control' type='text' value={this.state.email} onChange={this.handleChange.bind(this)('email')}/></p>
             <p> <label htmlFor='Department'>Department</label> <input id='Department' placeholder='department' className='form-control' type='text' value={this.state.department} onChange={this.handleChange.bind(this)('department')}/></p>
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
