import React from 'react';
import { Link, Redirect } from 'react-router'
import { apiRequest } from '../utils/request.js'

// Компонент списка диалогов
export default class CPDialog extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    console.log('render CPDialog ' + this.props.activeDialog);
    return(
      <ul className='dialogList'>
        {
          this.props.dialogs.map(dialog =>
            <li key={dialog.id} onClick={this.props.selectDialog(dialog.id)}
               className={
                 "" + ((dialog.id == this.props.activeDialog) ? 'dialogList__element_selected' : 'dialogList__element')
               }>
                {dialog.name}
            </li>
          )
        }
      </ul>
    )

  }

}
