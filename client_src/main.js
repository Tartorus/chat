import React from 'react';
import ReactDOM from 'react-dom';
import { Reg, App } from './app.jsx';
import { Router, Route, hashHistory } from 'react-router'


// ReactDOM.render(<App />, document.getElementById('app'));

ReactDOM.render((
   <Router history={hashHistory}>
      <Route path="/" component={ App }/>
      <Route path="/registration" component={ Reg }/>
   </Router>

), document.getElementById('app'))
