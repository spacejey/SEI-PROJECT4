import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

function PageNavBar() {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/map">Navbar</Navbar.Brand>
          {/* <Nav className="me-auto">
            <Nav.Link href="/user/:userId">Profile</Nav.Link>
          </Nav> */}
        </Container>
      </Navbar>
    </>
  )
}

export default PageNavBar