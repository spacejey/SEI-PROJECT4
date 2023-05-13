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
import ReviewBox from '../main/ReviewBox'


// 리뷰 페이지 작성. 여기에는 검증된 유저에 한해서만 리뷰를 작성할 수 있도록 Input칸과 Post 버튼을 작성한다.
// 일단 usaeEffect로 유져를 매번 새로 불러오고
// input에 text와, post버튼을 눌러 handleSubmit에 연동시킨다. 
const ReviewPage = () => {
  
  // Variables
  const { truckId } = useParams()
  const { userId } = useParams()

  // States
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({
    text: '',
    rate: '',
    truck: truckId,
    user: userId,
  })
  const [ postError, setPostError ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ userReviews, setUserReviews ] = useState([])
  const [ trucksError, setTrucksError ] = useState('')
  

  // ! Executions
  const handleChange = (e) => {
    setNewReview({ ...newReview, text: e.target.value })
    setPostError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await authenticated.post('/api/reviews/', ...newReview)
      // Update the reviews state
      setNewReview({ text: '', rate: '', truck: truckId, user: userId })
      setReviews([...reviews, response.data])
    } catch (err) {
      console.log(err.message)
      setPostError('')
    }
  }


  useEffect(() => {
    const getReviews = async () => {
      try {
        const { data } = await authenticated.get('/api/auth/users/')
        setReviews(data)
      } catch (err) {
        console.log(err)
        setTrucksError('')
      }
    }
    getReviews()
  }, [userId])


  return (
    <div onSubmit={handleSubmit}>
      <Col as='form'  >
        <Row>
          <p className='user-review'>@ {user.username}</p>
          <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'flex-end' }}>
            <StarRating value={newReview.rate} onChange={(value) => setNewReview({ ...newReview, rate: value })}/>
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
      <ReviewBox />
      {reviews ?
        reviews.map(review => {
          const { text, rate, id, owner: { username } } = review
          return (
            <Card key={id}>
              <Fragment key={id}>
                {userIsOwner(review) ?
                  <Card username={user.username} truckError={truckId} />
                  :
                  <div className='reviews-section'>
                    {/* <h4 className='user-name'>@ {user.username}</h4> */}
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
          {trucksError ?
            <Error error={trucksError} />
            :
            <Spinner />
          }
        </>
      }
    </div>
  )
}


export default ReviewPage