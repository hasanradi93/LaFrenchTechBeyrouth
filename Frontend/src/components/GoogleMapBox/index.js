import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

function GoogleMapBox({ X, Y }) {
  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: X,
    lng: Y
  };
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAD_WIO6vcNdJIj6deQz73_uBrVTuonhJQ"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      { /* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : <></>
}

export default React.memo(GoogleMapBox)