import React from 'react'


import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{lat: 32.864772, lng: 35.101881 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 32.864772, lng: 35.101881 }} />}
  </GoogleMap>
))

export default Map
