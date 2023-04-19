import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Custom imports
import { includesUserId, isAuthenticated } from '../../helpers/auth'

//Bootstrap
import Form from 'react-bootstrap/Form'

const Profile = ({ user, userError, setUserError }) => {

  // ! Variables
  const { userId } = useParams()
  const navigate = useNavigate()

  // ! State
  const [ users, setUsers ] = useState([])
  const [ userReviews, setUserReviews ] = useState([])
  const [ stagesError, setStagesError ] = useState('')
  

  // ! On Mount
  useEffect(() => {
    // !isAuthenticated() && navigate('/')
    const getReviews = async () => {
      try {
        const { data } = await axios.get('/api/auth/users/')
        setUsers(data)
        setUserReviews(userReviews)
      } catch (err) {
        console.log(err)
        setStagesError(err.message)
      }
    }
    getReviews()
  }, [])

    
  return (
    <Form >
      <Form.Group className="mb-3">
        <Form.Label>
          {users.map(user => (
            <div key={user.id}>
              <p>{user.username}</p>
            </div>
          ))}
        </Form.Label>
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
    </Form>
  )
}

export default Profile