import React, { Component } from 'react';
import VenueList from './VenueList'
import './App.css';

export default class Sidebar extends Component {
	constructor() {
		super()
		this.state = {
			query: ''
		}
	}

	handleFilterVenues = () => {

	}

	handleChange = e => {
		this.setState({ query: e.target.value })
		console.log( this.state.query )
		// const markers = this.props.venues.map(venue => {
		// 	//const isMatched = venue.name.includes(e.target.value)
		// 	//const marker = this.props.markers.find(marker = marker.id === venue.id)
		// 	if(isMatched){
		// 	marker.isVisible = true
			
		// 	} 	else {
		// 	marker.isVisible = false
		// }
		// return marker
		
	}

	render() {

		return (<div className='sideBar'>
			<input type={'search'} id={'search'} placeholder={'Filter Venues'} onChange={this.handleChange} />
			<VenueList {...this.props} handleVenueClick={this.props.handleVenueClick}/>
		</div>)
	}
}