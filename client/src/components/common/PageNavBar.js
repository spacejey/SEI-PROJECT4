import { useState, useEffect } from 'react'

// Bootstrap
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'


function PageNavBar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('SEI-PROJECT4')
    setIsLoggedIn(!!token) // token이 있으면 true, 없으면 false
  }, [])

  const handleLogout = (e) => {
    localStorage.removeItem('SEI-PROJECT4')
    setIsLoggedIn(false)
  }

  return (
    <>
      <Navbar bg="light" variant="light" >
        <Container>
          <Navbar.Brand href="/map">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            {isLoggedIn ? (
              <>
                <Nav.Link href="/login">Profile</Nav.Link>
                <Button onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Log In</Nav.Link>
                <Nav.Link href="/register">Sign In</Nav.Link>
              </>
            )
            }
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default PageNavBar