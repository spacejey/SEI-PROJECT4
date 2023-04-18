import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Components
import Error from '../common/Error'
import Spinner from '../common/Spinner'
import TruckCard from './TruckCards'
import { isAuthenticated } from '../../helpers/auth'

// Bootstrap
import { Container, Row, Col, Card, Button } from 'react-bootstrap'


const TruckSingle = () => {

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
    <Container  className="d-flex justify-content-center align-items-center">
      <Row>
        <Col xs={{ span: 10, offset: 1 }} sm={{ span: 10, offset: 3 }} md={{ span: 10, offset: 2 }}>
          <TruckCard />
          <Card>
            <h5>About my truck...</h5>
            <Card.Body>{truck.description}</Card.Body>
            <h5>Menu...</h5>
            <Card.Body>{truck.menu}</Card.Body>
            <h5>Reviews</h5>

          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default TruckSingle