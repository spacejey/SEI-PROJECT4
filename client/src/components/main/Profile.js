import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

//Bootstrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// Custom imports
import { includesUserId, isAuthenticated, authenticated } from '../../helpers/auth'
import Spinner from '../common/Spinner'
import Error from '../common/Error'
import ProfileImage from './ProfileImage'

const Profile = ({ getUser, userError, setUserError }) => {

  // ! Variables
  const { userId } = useParams()
  const navigate = useNavigate()

  // ! State
  const [ user, setUser ] = useState(null)
  const [ trucks, setTrucks ] = useState([])
  const [ userReviews, setUserReviews ] = useState([])
  const [ trucksError, setTrucksError ] = useState('')
  

  // ! On Mount
  useEffect(() => {
    !isAuthenticated() && navigate('/')
    const getReviews = async () => {
      try {
        const { data } = await authenticated.get('/api/auth/users/')
        setUser(data)
        setUserReviews(userReviews)
        console.log(userReviews)
      } catch (err) {
        console.log(err)
        setTrucksError(err.message)
      }
    }
    getReviews()
  }, [])

    
  return (
    <Form >
      <Form.Group className="mb-3">
        <div className='info'>
          {user ?
            <>
              <ProfileImage userId={userId} getUser={getUser} user={user} setUserError={setUserError} />
              <p> {user && <div> Hello, {user.username} </div>} </p>
              <div className='info-username-email'>
                <h3>Username: @{user.username}</h3>
                <h3>Email: {user.email}</h3>
              </div>
            </>
            :
            <>
              {userError ?
                <Error error={userError} />
                :
                <Spinner />}
            </>
          }
        </div>
        <Button>Check my reviews</Button>
      </Form.Group>
    </Form>
  )
}

export default Profile