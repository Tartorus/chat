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
      department: {name:"Choose department", id:null},
      departmentList: [],
    };

  }

  componentWillMount(){
    var response = apiRequest(appUrls['departmentList'], 'get')
    .then(response => {
      if (response.status == 200){
        return response.json();
      }
      else {
        throw Error(response.statusText);
      }
    })
    .then(data => {
      this.setState({departmentList:data});
      };
    })
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
      department:this.state.department.id,
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


             <label htmlFor='Department'>Department</label>
             <div className="dropdown">
               <button className="btn btn-default dropdown-toggle"
                  type="button"
                  id="dropdownMenu1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true">
                 {this.state.department.name}
                 <span className="caret"></span>
               </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                {
                  this.state.departmentList.map(department =>
                    <li key={department.id}
                      onClick={() => {
                        this.setState({department:
                          {
                            name:department.name,
                            id:department.id
                          }
                        }
                      )
                      }
                    }
                    >
                      {department.name}
                    </li>
                  )
                }
              </ul>
            </div>


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
