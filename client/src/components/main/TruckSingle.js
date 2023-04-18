import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Components
import Error from '../common/Error'
import Spinner from '../common/Spinner'
import { isAuthenticated } from '../../helpers/auth'

// Bootstrap
import { Container, Row, Col, Card, Button } from 'react-bootstrap'


const TruckSingle = () => {

  // ! Variables
  const { truckId } = useParams()
  const navigate = useNavigate()

  // ! State
  const [ trucks, setTrucks ] = useState([])
  const [ error, setError ] = useState('')

  // ! On Mount
  useEffect(() => {
    // !isAuthenticated() && navigate('/')
    const getTrucks = async () => {
      try {
        const { data } = await axios.get(`/api/trucks/${truckId}`)
        setTrucks(data)
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    }
    getTrucks()
  }, [truckId])


  return (
    <Container>
      {trucks.length > 0 ?
        trucks.map(truck => {
          const { id, name, description, open, closed } = truck
          return (
            <>
              <Card style={{ width: '22rem' }}>
                <Card.Body>
                  <Card.Title style={{ color: 'green' }}>{name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {open}{closed}
                  </Card.Subtitle>
                  <Card.Text>{description}</Card.Text>
                  <Card.Link href="/truck/:truckId">Truck Single</Card.Link>
                </Card.Body>
              </Card>
            </>
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
  )
}

export default TruckSingle