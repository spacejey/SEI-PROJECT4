import React, { useState, useEffect } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

// Components
import MapMarker from './MapMarker'
import Error from '../common/Error'
import Spinner from '../common/Spinner'

const libraries = ['places'] 

// Map style
const containerStyle = {
  width: '100vw',
  height: '60vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '50px',
}

// User current location 
const redCircle = {
  path: 'M10,0A10,10,0,1,0,20,10A10,10,0,0,0,10,0Z',
  fillColor: 'green',
  fillOpacity: 1,
  strokeColor: 'green',
  strokeWeight: 0,
  scale: 1,
}


function MapComponent() {
  // States
  const [currentPosition, setCurrentPosition] = useState({ lat: 51.5916620616722, lng: -0.07530838650631153 })
  
  function handleApiLoad(map, maps) {
  
    // Set the default location to depends on user's current lacation
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setCurrentPosition({ lat: latitude, lng: longitude })
        },
        (error) => {
          console.error(error)
          alert('Not Found Current Location')
        }
      )
    }, [])

  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  })
  console.log('isLoaded->', isLoaded)
  console.log('CURRENT->', currentPosition)


  return (
    <div className='map-components'>
      { isLoaded && 
        <GoogleMap mapContainerStyle={containerStyle} center={currentPosition} zoom={14}>
          <MapMarker />
          {currentPosition && (
            <Marker position={currentPosition} icon={redCircle}/>
          )}
        </GoogleMap>
      }
    </div>
  )
}

export default MapComponent