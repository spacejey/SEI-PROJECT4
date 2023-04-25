import { useState, useEffect } from 'react'
import { FaHome } from 'react-icons/fa'
import { MdAccountCircle } from 'react-icons/md'

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
      <Navbar bg="white" variant="light" >
        <Container>
          <div className="d-flex justify-content-between w-100">
            <Navbar.Brand href="/map"><FaHome /></Navbar.Brand>
            <div className="d-flex">
              <Nav className="me-auto">
                {isLoggedIn ? (
                  <Nav.Link href="/user" className='profile-photo'><MdAccountCircle size={25} /></Nav.Link>
                ) : (
                  <>
                    <Nav.Link href="/login">Log In</Nav.Link>
                    <Nav.Link href="/register">Sign In</Nav.Link>
                  </>
                )}
                {isLoggedIn && (
                  <Nav.Link href="/" onClick={handleLogout}>Logout</Nav.Link>
                )}
              </Nav>
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  )
}

export default PageNavBar