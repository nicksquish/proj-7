import React, {Component} from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{lat: 41.991431, lng: -87.676839}}
  >
    {props.markers && props.markers
      .filter(marker => marker.isVisible)
      .map((marker, idx) => (
      <Marker key={idx} position={{ lat: marker.lat, lng: marker.lng }}
      onClick={() => props.handleMarkerClick(marker)}>
        {marker.isOpen && <InfoWindow>
          <p>hello</p>
        </InfoWindow>
      }
      </Marker>
      ))}
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
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}