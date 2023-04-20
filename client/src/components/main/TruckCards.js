import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// Components
import Error from '../common/Error'
import Spinner from '../common/Spinner'

// Bootstrap
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge'


const TruckCard = () => {

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
        console.log(data)
      } catch (err) {
        console.log(error)
      }
    }
    getTruck()
  }, [truckId])



  return (
    <Container  className="d-flex justify-content-center align-items-center">
      {Object.keys(truck).length > 0 ?
        <Card style={{ width: '22rem' }}>
          <Card.Body>
            <h1>Example heading <Badge bg="secondary">New</Badge></h1>
            <Card.Title style={{ color: 'green' }}>
              {truck.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {truck.open} ~ {truck.closed}
            </Card.Subtitle>  
            <div>
              {Object.keys(truck).filter(day => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].includes(day)).map((day) => {
                if (day !== 'name' && day !== 'open' && day !== 'closed' && truck[day]) {
                  return <p key={day}>{day}</p>
                }
                return null
              })}
            </div>
          </Card.Body>
        </Card>
        :
        <>
          {error ?
            <Error error={error} />
            :
            <Spinner />}
        </>
      }
    </Container>
  )
}

export default TruckCard