import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'


const containerStyle = {
  width: '100vw',
  height: '60vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '50px',
}

const libraries = ['places'] 

function MapComponent() {

  const [currentPosition, setCurrentPosition] = useState(null)
  const [markers, setMarkers] = useState([])

  // const uluru = { lat: -25.344, lng: 131.031 }
  // const map = new google.maps.Map(document.getElementById('map'), {
  //   zoom: 4,
  //   center: uluru,
  // })
  // const marker = new google.maps.Marker({
  //   position: uluru,
  //   map: map,
  // })
  

  // Set the default location to depends on user's current lacation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setCurrentPosition({ lat: latitude, lng: longitude })
      },
      () => {
        // If it's fail, set the default to London
        setCurrentPosition({ lat: 51.5074, lng: -0.1278 })
      }
    )
  })


  // // When user clicked on the map, Marker has appeared.
  // function handleMapClick(event) {
  //   const { latLng } = event
  //   const latitude = latLng.lat()
  //   const longitude = latLng.lng()
  //   setMarkers((markers) => [
  //     ...markers,
  //     {
  //       position: {
  //         lat: latitude,
  //         lng: longitude,
  //       },
  //     }
  //   ])
  // }
  // console.log(GoogleMap)


  return (
    <div className='map-components'>
      <LoadScript googleMapsApiKey={ process.env.REACT_APP_GOOGLE_MAPS_API_KEY } libraries={libraries}>
        <GoogleMap mapContainerStyle={containerStyle} center={currentPosition} zoom={13}>
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.position} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default MapComponent