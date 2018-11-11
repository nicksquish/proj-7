import React, { Component } from 'react';
import App from './App'
import './App.css';

//list of venue names for reference in sidebar. links to matching marker on map
export default class ListItems extends Component {

	render() {

		return (<li className='listItems' onClick={() => this.props.handleVenueClick(this.props)}>
			{this.props.name}
		</li>)
	}
}