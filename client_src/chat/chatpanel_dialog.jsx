import React from 'react';
import { Link, Redirect } from 'react-router'
import { apiRequest } from '../utils/request.js'


export default class CPDialog extends React.Component{

  constructor(props){
    super(props);

  }

  render(){
    console.log('render CPDialog');
    return(
      <ul>
        {
          this.props.dialogs.map(dialog =>
            <li key={dialog.id}> {dialog.name} </li>
          )
        }
      </ul>
    )

  }

}
