import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '100vw',
  height: '80vh',
}

function MapComponent() {
  
  // const center = {
  //   lat: 51.5074,
  //   lng: -0.1278,
  // }

  const [currentPosition, setCurrentPosition] = useState(null)
  const [markers, setMarkers] = useState([])


  // Set the default location to depends on user's current lacation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setCurrentPosition({ lat: latitude, lng: longitude })
      },
      () => {
        // If it's fail set the default to London
        setCurrentPosition({ lat: 51.5074, lng: -0.1278 })
      }
    )
  })


  // When user clicked on the map, Marker has appeared.
  function handleMapClick(event) {
    const { latLng } = event
    const latitude = latLng.lat()
    const longitude = latLng.lng()
    setMarkers((markers) => [
      ...markers,
      {
        position: {
          lat: latitude,
          lng: longitude,
        },
      }
    ])
  }
  console.log(GoogleMap)
  return (
    <LoadScript googleMapsApiKey={ process.env.REACT_APP_GOOGLE_MAPS_API_KEY }>
      <GoogleMap mapContainerStyle={containerStyle} center={currentPosition} zoom={13} onClick={handleMapClick}>
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} />
        ))}
      </GoogleMap>
    </LoadScript>
  )
  
}

export default MapComponent