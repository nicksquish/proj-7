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
      markers: []
    }
  }

  closeMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false
      return marker
    })
    this.setState({markers: Object.assign(this.state.markers, markers)})
  }

  handleMarkerClick = (marker) => {
    this.closeMarkers()
    console.log(marker)
    marker.isOpen = true
    this.setState({markers: Object.assign(this.state.markers, marker)})
    const venue = this.state.venues.find(venue => venue.id === marker.id)
    
    SquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue)
      this.setState({venues:Object.assign(this.state.venues, newVenue)})
        })
  }

  componentDidMount() {
    SquareAPI.search({
      near: '60660',
      query: 'tacos',
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
      console.log(results)
  })
}
  render() {
    return (
      <div className="App">
        
        <Map {...this.state}
        handleMarkerClick={this.handleMarkerClick}
        />

      </div>
    );
  }
}

export default App;
