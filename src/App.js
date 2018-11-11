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

  closeMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false
      return marker
    })
    this.setState({markers: Object.assign(this.state.markers, markers)})
  }

  handleMarkerClick = marker => {
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

  handleVenueClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id)
    this.handleMarkerClick(marker)
    console.log(venue.id)
  }

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
      console.log(results)
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
