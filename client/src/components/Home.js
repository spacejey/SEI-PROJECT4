import { Link } from 'react-router-dom'

// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const Home = () => {
  return (
    <main>
      <Container>
        <Row>
          <Col xs={{ span: 10, offset: 1 }} sm={{ span: 6, offset: 3 }} md={{ span: 4, offset: 4 }}>
            <h1>STAY<br />COOL</h1>
            <Button to="/Map" as={Link} className='btn'>Start to be Stay Cool!</Button>
            <br />
            <Button to="/Login" as={Link} className='btn'>Wanna Login?</Button>
          </Col>
        </Row>
      </Container>
    </main>

  )
}

export default Home