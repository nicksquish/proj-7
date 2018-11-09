import React, { Component } from 'react'
import Map from './Map'
import './App.css'
import SquareAPI from './Foursquare'

class App extends Component {

  constructor(){
    super()
    this.state = {
      venues: [],
      markers: [],
      
    }
  }

  componentDidMount() {
    SquareAPI.search({
      near: 'Chicago, IL',
      query: 'fun',
      limit: 15
    }).then(results => console.log(results))
    // this.getVenues()
    // this.getMarkers()
  }

  // getVenues = () => {
  //   const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
  //   const parameters = {
  //     client_id: 'HM4UUEGOD54Z05TFCFWL04IZURSAOJK4XE3W4O0HAWNVWJLV',
  //     client_secret: '55IUQMXWYAUOVQOYTGZX50E4YAQ5VVDJK03Y3UODBFUDSMW5',
  //     v: '20181019',
  //     ll: '41.991431, -87.676839'
  //   }

  //   axios.get(endPoint + new URLSearchParams(parameters))
  //     .then(response => {
  //       this.setState({venues: response.data.response.groups[0].items})       
  //       console.log(response)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }
  // getMarkers = () => {
  //   const markers = this.state.venues.map(venue => {
  //         return {
  //           position: {lat: venue.location.lat, 
  //                    lng: venue.location.lng},
  //           isOpen: false,
  //           isVisible: true,
  //           title: venue.name,
  //           id: venue.id
  //         }
  //       })

  //       this.setState({markers})
  // }

  render() {
    return (
      <div className="App">
        
        <Map {...this.state}/>

      </div>
    );
  }
}

export default App;
