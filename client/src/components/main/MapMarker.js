import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Marker, InfoWindow } from '@react-google-maps/api'
import { Container } from 'react-bootstrap'



function MapMarker() {
  

  // States
  const [markers, setMarkers] = useState([])
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [currentPosition, setCurrentPosition] = useState(null)
  
  
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
            description: truck.description,
            id: truck.id,
            isOpen: false,
          }
        })
        setMarkers(markers)
      })
      .catch(error => console.log(error))
  }, [])


  
  function handleMarkerClick(marker) {
    setMarkers((prevMarkers) =>
      prevMarkers.map((m) => {
        if (m === marker) {
          return { ...m, isOpen: true }
        }
        return { ...m, isOpen: false }
      })
    )
    setSelectedMarker(marker)
  }


  
  return (
    <Container>
      {markers.map((marker) => (
        <Marker 
          key={marker.id}
          position={marker.position}
          onClick={() => handleMarkerClick(marker)}
        >
          {marker.isOpen  && (
            <InfoWindow onClick={() => setSelectedMarker(null)}>
              <div>
                <h3>{marker.title}</h3>
                <p>{marker.description}</p>
              </div>
            </InfoWindow>
          )}

        </Marker>
      ))}
    </Container>
  )

}
export default MapMarker