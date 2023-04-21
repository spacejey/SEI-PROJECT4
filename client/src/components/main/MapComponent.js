import axios from 'axios'
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

  // States
  const [currentPosition, setCurrentPosition] = useState(null)
  const [markers, setMarkers] = useState([])
  const [ truck, setTruck ] = useState({})
  

  // Set the default location to depends on user's current lacation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setCurrentPosition({ lat: latitude, lng: longitude })
      },
      () => {
        setCurrentPosition({ lat: 51.5074, lng: -0.1278 })
      }
    )
  })

  useEffect(() => {
    const getTruck = async () => {
      try {
        const { data } = await axios.get('/api/trucks/')
        setTruck(data)
      } catch (err) {
        console.log(err)
      }
    }
    getTruck()
  }, [])

  useEffect(() => {
    axios.get('/api/trucks/')
      .then(response => {
        const markers = response.data.map(truck => {
          return {
            position: {
              lat: truck.latitude,
              lng: truck.longitude,
            },
            title: truck.name,
          }
        })
        setMarkers(markers)
      })
      .catch(error => console.log(error))
  }, [])



  return (
    <div className='map-components'>
      <LoadScript googleMapsApiKey={ process.env.REACT_APP_GOOGLE_MAPS_API_KEY } libraries={libraries}>
        <GoogleMap mapContainerStyle={containerStyle} center={currentPosition} zoom={13}>
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.position} title={marker.title} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default MapComponent