import React, { Component } from 'react'
import Map from './Map'
import './App.css'
import SquareAPI from './Foursquare'
import Sidebar from './Sidebar'

class App extends Component {

  constructor(){
    super()
    this.state = {
      venues: [],
      markers: [],
      updateSuperState: obj => {
        this.setState(obj)
      }
    }
  }
//close all other markers' infowindows on map when one has it's info window open
  closeMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false
      return marker
    })
    this.setState({markers: Object.assign(this.state.markers, markers)})
  }
//opens targeted markers info window when clicked
  handleMarkerClick = marker => {
    this.closeMarkers()
    marker.isOpen = true
    this.setState({markers: Object.assign(this.state.markers, marker)})
    const venue = this.state.venues.find(venue => venue.id === marker.id)
    
    SquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue)
      this.setState({venues:Object.assign(this.state.venues, newVenue)})
        })
  }
//borrows handleMarkerClick's functionality to open the matching marker
//when clicking on a listed venue in the sidebar
  handleVenueClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id)
    this.handleMarkerClick(marker)
  }
//utilize foursquare api to search for venues matching the requested query
//maps over returned data to markers
  componentDidMount() {
    SquareAPI.search({
      near: '60660',
      query: 'restaurant',
      limit: 10
    }).then(results => {
      const { venues } = results.response
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        }
      })
      this.setState({ venues, markers })
  })
}
  render() {
    return (
      <div className="App">
        <Sidebar {...this.state} handleVenueClick={this.handleVenueClick}/>
        <Map {...this.state}
        className='map'
        handleMarkerClick={this.handleMarkerClick}
        />

      </div>
    );
  }
}

export default App;
