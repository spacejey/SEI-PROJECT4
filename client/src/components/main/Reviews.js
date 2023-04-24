import React, { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// Bootstrap imports
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

// Custom components
import { authenticated, userIsOwner } from '../../helpers/auth'
import Spinner from '../common/Spinner'
import Error from '../common/Error'
import StarRating from '../main/StarRating'



const ReviewPage = ({ truck, getTruck, truckError }) => {
  
  // Variables
  const { truckId } = useParams()

  // States
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({
    text: '',
    rate: '',
    truck: truckId,
  })
  const [ postError, setPostError ] = useState('')


  // ! Variables

  const { userId } = useParams()

  // ! State
  const [ user, setUser ] = useState(null)
  const [ trucks, setTrucks ] = useState([])
  const [ userReviews, setUserReviews ] = useState([])
  const [ trucksError, setTrucksError ] = useState('')
  

  // ! Executions
  const handleChange = (e) => {
    setNewReview({ ...newReview, text: e.target.value })
    setPostError('')
  }

  useEffect(() => {
    const getReviews = async () => {
      try {
        const { data } = await authenticated.get('/api/auth/users/')
        setUser(data)
        setUserReviews(userReviews)
        console.log('HAHA=>', data)
      } catch (err) {
        console.log(err)
        setTrucksError(err.message)
      }
    }
    getReviews()
  }, [userId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await authenticated.post('/api/reviews/', newReview)
      // Update the reviews state
      setNewReview({ text: '', rate: '', truck: truckId })
      setReviews([...reviews, response.data])
      getTruck()
    } catch (err) {
      console.log(err.message)
      setPostError('')
    }
  }




  return (
    <div onSubmit={handleSubmit}>
      <Col as='form'  >
        <Row>
          {/* <p className='user-review'>@ {user.username}</p> */}
          <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'flex-end' }}>
            <StarRating value={newReview.rate}  onChange={(value) => setNewReview({ ...newReview, rate: value })}/>
          </div>
          <div className='review-input' style={{ marginBottom: '30px' }} >
            <textarea className="title-input"
              type='text'
              placeholder='You can write review after login'
              onChange={handleChange}
              value={newReview.text}
              name='text'
              style={{ width: '80vw', marginRight: '30px' }}
            />
            <button className="post-btn">Post</button>
          </div>
        </Row>
      </Col>
      <div className='error'>
        {postError && <Error error={postError} />}
      </div>

      {reviews ?
        reviews.map(review => {
          const { text, rate, id } = review
          return (
            <Card key={id}>
              <Fragment key={id}>
                {userIsOwner(review) ?
                  <Card username={user.username} truck={truck} getTruck={getTruck} truckError={truckId} />
                  :
                  <div className='reviews-section'>
                    <h4 className='user-name'>@ {user.username}</h4>
                    <p className='rate'>Rate: {rate} stars </p>
                    <p className='review'>Review: {text}</p>
                  </div>
                }
              </Fragment>
            </Card>
          )
        })
        :
        <>
          {truckError ?
            <Error error={truckError} />
            :
            <Spinner />
          }
        </>
      }
    </div>
  )
}


export default ReviewPage