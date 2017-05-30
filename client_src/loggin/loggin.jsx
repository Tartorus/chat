import React from 'react';

export default class Loggin extends React.Component {
   render() {
      return (
         <div>
            <form action='api/loggin' method='POST'>
              <input placeholder='loggin' type='text'/>
              <p><input placeholder='password' type='password'/></p>
              <p><input type='submit' value='Отправить'/></p>
            </form>
         </div>
      );
   }
}
