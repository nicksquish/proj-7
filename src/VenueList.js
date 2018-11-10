import React, { Component } from 'react';
import ListItems from './ListItems'
import App from './App'
import './App.css';

export default class VenueList extends Component {

	render() {

		return (<ol className='venueList'>
			{this.props.venues && this.props.venues.map((venue, idx) => (
				<ListItems key={idx} {...venue} handleVenueClick={this.props.handleVenueClick}/>
				))}
		</ol>)
	}
}