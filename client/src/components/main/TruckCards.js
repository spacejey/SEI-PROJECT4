import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// Components
import Error from '../common/Error'
import Spinner from '../common/Spinner'

// Bootstrap
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap'


const TruckForm = () => {

  // ! State
  const [ truck, setTruck ] = useState({})
  const [ error, setError ] = useState('')

  // ! Variables
  const { truckId } = useParams()


  useEffect(() => {
    const getTruck = async () => {
      try {
        const { data } = await axios.get(`/api/trucks/${truckId}/`)
        setTruck(data)
      } catch (err) {
        console.log(error)
      }
    }
    getTruck()
  }, [truckId])



  return (
    <div className='truck-single'>
      <Card className="my-3 cloud-card" style={{ width: '80vw' }}>
        <Card.Body className="mb-2 text-muted" style={{ color: 'rgb(50, 50, 50)' }}>
          <Badge bg="warning" text="white" style={{ fontSize: '0.7rem' }}>OPEN </Badge>  
          {Object.keys(truck)
            .filter(day => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].includes(day))
            .map((day, index) => {
              if (day !== 'name' && day !== 'open' && day !== 'closed' && truck[day]) {
                return <span key={day}>{index > 0 && ' '} {day} </span>
              } 
              return null
            })}
          | {truck.open} ~ {truck.closed} 
          <Card.Title className="truck-name" style={{ color: 'rgb(80, 80, 80)', marginTop: '20px', fontSize: 55 }}>
            {truck.name}
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  )
}

export default TruckForm