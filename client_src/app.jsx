import React from 'react';
import { Link } from 'react-router'

class App extends React.Component {
   render() {
      return (
         <div><Link to='/registration'>Hello World!!!</Link></div>
      );
   }
}


class Reg extends React.Component {
   render() {
      return (
         <div>
            REGISTER
         </div>
      );
   }
}

export { Reg , App};
