import { Link } from 'react-router-dom'

// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

// Components
import Icecream from '../images/home-icecream-3d.png'

const Home = () => {

  
  return (
    <main>
      <Container xs={{ span: 10 }} sm={{ span: 6 }} md={{ span: 4 }}>
        <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Col>
            <div className='main-title'>
              <span className='stay'>STAY</span><br />
              <img className='icecream' src={Icecream} alt="" />
              <span className='cool'>COOL</span>
            </div>
            <div className='main-btn'>
              <Button to="/Map" as={Link} className='main-btn'>Start!</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Home