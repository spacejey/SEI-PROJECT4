import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

//Bootstrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// Custom imports
import { includesUserId, isAuthenticated, authenticated } from '../../helpers/auth'
import Spinner from '../common/Spinner'
import Error from '../common/Error'
import ProfileImage from './ProfileImage'
import PageNavBar from '../common/PageNavBar'

const Profile = ({ getUser, userError, setUserError }) => {

  // ! Variables
  const navigate = useNavigate()
  const { userId } = useParams()

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

      } catch (err) {
        console.log(err)
        setTrucksError(err.message)
      }
    }
    getReviews()
  }, [userId])

    
  return (
    <div className='profile'>
      <PageNavBar />
      <Form >
        <Form.Group className="mb-3">
          <div className='info'>
            {user ?
              <>
                <div className='profile-info'>
                  {user.image}
                  <div className='greeting'> 
                    {user && <h4>Welecome Back, <span>{user.username}</span> </h4>} 
                  </div>
                  <div className='info-username-email'>
                    <p className='title-username'>Username </p>
                    <p className='info-username' >@ {user.username}</p>
                    <p className='title-email'>Email </p>
                    <p className='info-username'>{user.email}</p>
                  </div>
                  <Button>Check my reviews</Button>
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
        </Form.Group>
      </Form>
    </div>
  )
}

export default Profile