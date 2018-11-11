import React, { Component } from 'react';
import VenueList from './VenueList'
import './App.css';
//sidebar to contain names of requested venues and allow for searching/filtering
export default class Sidebar extends Component {
	constructor() {
		super()
		this.state = {
			query: '',
			venues: []
		}
	}
//matches query in search bar with venues containing the same text. 
//converts any capital letters in query to lowercase
	handleFilterVenues = () => {
		if (this.state.query.trim() != '') {
			const venues = this.props.venues.filter(venue => venue.name
				.toLowerCase()
				.includes(this.state.query.toLowerCase()))
			return venues
		}
		return this.props.venues
	}
//filter out any markers/listed venues if they do not match part of the search query
	handleChange = e => {
		this.setState({ query: e.target.value })
		const markers = this.props.venues.map(venue => {
			const isMatched = venue.name.toLowerCase().includes(e.target.value.toLowerCase())
			const marker = this.props.markers.find(marker => marker.id === venue.id)
			if(isMatched){
			marker.isVisible = true
			} 	else {
			marker.isVisible = false
		}
		return marker
	})
		this.props.updateSuperState({markers})
}

	render() {

		return (<div className='sideBar'>
			<input type={'search'} id={'search'} placeholder={'Filter Venues'} onChange={this.handleChange} />
			<VenueList {...this.props} venues={this.handleFilterVenues()} handleVenueClick={this.props.handleVenueClick}/>
		</div>)
	}
}