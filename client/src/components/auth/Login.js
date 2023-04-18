import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

//Bootstrap
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const Login = () => {


  // variables
  const navigate = useNavigate()

  // State
  const [ formFields, setFormFields ] = useState({
    email: '',
    password: '',
  })
  const [ loginError, setLoginError ] = useState('')

  // Excutions
  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setLoginError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', { ...formFields })
      localStorage.setItem('SEI-PROJECT4', data.token)
      console.log(data)
    } catch (err) {
      console.log(err)
      setLoginError('Invalid Email or Password. Try again.')
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          Well never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit" to='/map'>Submit</Button>
    </Form>
  )



}
export default Login