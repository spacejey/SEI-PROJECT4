import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Custom imports
import { includesUserId, isAuthenticated, authenticated } from '../../helpers/auth'

//Bootstrap
import Form from 'react-bootstrap/Form'

const Profile = () => {

  // ! Variables
  const { userId } = useParams()
  const navigate = useNavigate()

  // ! State
  const [ user, setUser ] = useState(null)
  const [ userReviews, setUserReviews ] = useState([])
  const [ stagesError, setStagesError ] = useState('')
  

  // ! On Mount
  useEffect(() => {
    // !isAuthenticated() && navigate('/')
    const getReviews = async () => {
      try {
        const { data } = await authenticated.get('/api/auth/users/')
        setUser(data)
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
          {user &&
            <div>
              {user.username}
            </div>
          }
        </Form.Label>
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
    </Form>
  )
}

export default Profile