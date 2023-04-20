import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// Components
import MapComponent from './MapComponent'
import Error from '../common/Error'
import Spinner from '../common/Spinner'
import TruckCard from './TruckCards'
import { isAuthenticated } from '../../helpers/auth'

// Bootstrap
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import PageNavBar from '../common/PageNavBar'
import Badge from 'react-bootstrap/Badge'



const Map = () => {

  // ! Variables
  const navigate = useNavigate()

  // ! State
  const [ trucks, setTrucks ] = useState([])
  const [ error, setError ] = useState('')

  // ! On Mount
  useEffect(() => {
    // !isAuthenticated() && navigate('/')
    const getTrucks = async () => {
      try {
        const { data } = await axios.get('/api/trucks/')
        setTrucks(data)
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    }
    getTrucks()
  }, [])



  return (
    <div>  
      <MapComponent/>
      <PageNavBar />
      <Container style={{ height: '100vh' }}>
        <h1 className='map-title'>Trucks around of me...</h1>
        {trucks.length > 0 ?
          trucks.map(truck => {
            const { id  } = truck
            const handleCardClick = () => {
              navigate(`/trucks/${id}`)
            }
            return (
              <Card key={id} onClick={handleCardClick} className="my-3 cloud-card">
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted" style={{ color: 'rgb(50, 50, 50)' }}>
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
                  </Card.Subtitle>
                  <Card.Title className="truck-name" style={{ color: 'rgb(80, 80, 80)', marginTop: '20px' }}>
                    {truck.name}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {truck.description}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            )
          })
          :
          <>
            {error ?
              <Error error={error} />
              :
              <Spinner />}
          </>
        }
      </Container>
    </div>
  )
}

export default Map