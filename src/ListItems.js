import React, { Component } from 'react';
import App from './App'
import './App.css';

export default class ListItems extends Component {

	render() {

		return (<li className='listItems' onClick={() => this.props.handleVenueClick(this.props)}>
			{this.props.venue.name}
		</li>)
	}
}