import React from 'react';
import { Link, Redirect } from 'react-router'


export default class CPTooBar extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    console.log('render CPTooBar');
    return(
      <div className='btn-group'>
        <button className={'btn btn-info ' + (this.props.tab == "dialogs" ? 'active': '')} onClick={this.props.changeTab('dialogs')}> dialogs <span className='glyphicon glyphicon-comment'></span></button>
        <button className={'btn btn-info ' + (this.props.tab == "contacts" ? 'active': '')} onClick={this.props.changeTab('contacts')}> contacts <span className='glyphicon glyphicon-book'></span> </button>
      </div>
    )
  }
}
