import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import Reg from './registration/registration.jsx'
import Login from './login/login.jsx'
import Chat from './chat/chat.jsx'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'


ReactDOM.render((
   <Router history={hashHistory}>
      <Route path="/" component={ App }>
        <IndexRoute component={ Chat } />
        <Route path="/login" component={ Login }/>
        <Route path="/registration" component={ Reg }/>
      </Route>
   </Router>

), document.getElementById('app'))
