import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Components
import Error from '../common/Error'
import Spinner from '../common/Spinner'
import TruckCard from './TruckCards'
import Reviews from './Reviews'

// Bootstrap
import { Container, Row, Col, Card } from 'react-bootstrap'
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
    } catch (err) {
      console.log(err)
      setTruckError(err.message)
    }
  }, [truckId])

  useEffect(() => {
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
    <Container className="d-flex justify-content-center align-items-center container-fluid vh-200">
      <PageNavBar />
      <Row>
        <Col>
          <TruckCard />
          <Card className="my-3 cloud-card" style={{ width: '80vw', padding: '50px' }}>
            <Card.Title>About my truck...</Card.Title>
            <Card.Subtitle style={{ marginBottom: '80px' }}>{truck.description}</Card.Subtitle>
            <Card.Img className='single-img' src={truck.image} alt="" style={{ width: '100%', marginBottom: '80px' }} />
            <div className='single-info'>
              <Card.Title>Reviews</Card.Title>
              <Reviews truck={truck} getTruck={getTruck} truckError={truckError}/>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default TruckSingle