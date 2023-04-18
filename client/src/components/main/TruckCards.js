import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Components
import Error from '../common/Error'
import Spinner from '../common/Spinner'
import { isAuthenticated } from '../../helpers/auth'

// Bootstrap
import { Container, Row, Col, Card, Button } from 'react-bootstrap'


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
            <Card.Title style={{ color: 'green' }}>{truck.name}</Card.Title>
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