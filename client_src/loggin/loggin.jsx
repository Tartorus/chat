import React from 'react';

export default class Loggin extends React.Component {
   render() {
      return (
<<<<<<< HEAD
         <div className='row'>

              <div className='col-md-4'> COL 1</div>
              <div className='col-md-4'> Loggin</div>
              <div className='col-md-4'> COL 3</div>
=======
         <div>
            <form action='api/loggin' method='POST'>
              <input placeholder='loggin' type='text'/>
              <p><input placeholder='password' type='password'/></p>
              <p><input type='submit' value='Отправить'/></p>
            </form>
>>>>>>> 3aaddc1f99b93c0f7b2d4e64ff0ede9f646772f3
         </div>
      );
   }
}
