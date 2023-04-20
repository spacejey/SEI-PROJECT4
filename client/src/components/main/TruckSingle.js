import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Components
import Error from '../common/Error'
import Spinner from '../common/Spinner'
import TruckCard from './TruckCards'
import { isAuthenticated } from '../../helpers/auth'
import Reviews from './Reviews'

// Bootstrap
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import PageNavBar from '../common/PageNavBar'




const TruckSingle = () => {
  
  // ! Variables
  const { truckId } = useParams()
  const navigate = useNavigate()

  // ! State
  const [ truck, setTruck ] = useState({})
  const [ truckError, setTruckError ] = useState('')

  // On Mount
  const getTruck = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/trucks/${truckId}`)
      setTruck(data)
      console.log(data)
    } catch (err) {
      console.log(err)
      setTruckError(err.message)
    }
  }, [truckId])

  useEffect(() => {
    !isAuthenticated() && navigate('/')
    const getTruck = async () => {
      try {
        const { data } = await axios.get(`/api/trucks/${truckId}/`)
        setTruck(data)
      } catch (err) {
        console.log(truckError)
      }
    }
    getTruck()
  }, [truckId])



  return (
    <Container  className="d-flex justify-content-center align-items-center container-fluid vh-100">
      <PageNavBar />
      <Row>
        <Col xs={{ span: 10, offset: 1 }} sm={{ span: 10, offset: 3 }} md={{ span: 10, offset: 2 }}>
          <TruckCard />
          <Card.Img variant="top" src="" />
          <h5>About my truck...</h5>
          <Card.Body>{truck.image}</Card.Body>
          <Card>  
            <Card.Body>{truck.description}</Card.Body>
          </Card>
          <h5>Menu...</h5>
          <Card>
            <Card.Body>{truck.menu}</Card.Body>
          </Card>
          <h5>Reviews</h5>
          <Card>
            <Reviews truck={truck} getTruck={getTruck} truckError={truckError}/>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default TruckSingle