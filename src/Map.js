/*global google*/
import React, {Component} from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

//initialize map and set default position
const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap 
    defaultZoom={14}
    defaultCenter={{lat: 41.991431, lng: -87.676839}}
  >
    {props.markers && props.markers
      .filter(marker => marker.isVisible)
      .map((marker, idx, arr) => {
      
      const venueInfo = props.venues.find(venue => venue.id === marker.id)
      //use data from requested venues to map location of markers
      return (
        <Marker key={idx} position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => props.handleMarkerClick(marker)}
          animation={arr.length === 1 
            ? google.maps.Animation.BOUNCE
            : google.maps.Animation.DROP
          }
        >
          {marker.isOpen && venueInfo.bestPhoto && (
            <InfoWindow>
              <React.Fragment>
                <img src={`${venueInfo.bestPhoto.prefix}125x125${venueInfo.bestPhoto.suffix}`} alt={'Venue photo'}/>
                <p>{venueInfo.name}</p>
              </React.Fragment>
          </InfoWindow>
        )}
        </Marker>
      )
    })}
  </GoogleMap>
))

export default class Map extends Component {
  render() {
    return (
      <MyMapComponent
        {...this.props}
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCkHGlZDBCdb9zG3JyAgWPToFUH-6vlxq8"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width: `75%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}