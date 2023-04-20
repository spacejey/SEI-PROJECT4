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
      <Container>
        <h1 className='map-title'>Trucks around of me...</h1>
        {trucks.length > 0 ?
          trucks.map(truck => {
            const { id, name, description, open, closed } = truck
            return (
              <Card key={id}>
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
                  <Button as={Link} to={`/trucks/${id}`}>Single Truck</Button>
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