import React from 'react';
import { Link } from 'react-router'
import { apiRequest, appUrls } from '../utils/request.js'

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
    apiRequest(appUrls['userLogin'], 'post',
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
         <div className='loginForm row'>
           <div className='col-md-4'></div>
           <div className='col-md-4'>
              <form onSubmit={this.handleSubmit.bind(this)} name='loginForm'>
                <div className='form-group'>
                  <label htmlFor='login'>Login</label>
                  <input id='login' className='form-control' placeholder='login' type='text' value={this.state.login} onChange={this.handleChange.bind(this)('login')}/>
                  <label htmlFor='password'>Password</label>
                  <p><input id='password' className='form-control' placeholder='password' type='password' value={this.state.password} onChange={this.handleChange.bind(this)('password')}/></p>
                  <div>
                    <p><input  className="btn btn-default loginForm_buttons" type='submit' value='login'/>
                    <Link className="btn btn-default loginForm_buttons" to={'registration'}>Registration</Link></p>
                  </div>
                </div>
              </form>
          </div>
          <div className='col-md-4'></div>

        </div>
      );
   }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
}
