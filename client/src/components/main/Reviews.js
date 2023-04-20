import React, { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// Bootstrap imports
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// Custom components
import { authenticated, userIsOwner } from '../../helpers/auth'
import Spinner from '../common/Spinner'
import Error from '../common/Error'
import StarRating from '../main/StarRating'
import ReviewBox from './ReviewBox'



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
  

  // ! Executions
  const handleChange = (e) => {
    setNewReview({ ...newReview, text: e.target.value })
    setPostError('')
  }

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
    console.log('RATE!!!!=>', newReview)
  }




  return (
    <div onSubmit={handleSubmit}>

      <Col as='form'  >
        <Row>
          <StarRating value={newReview.rate}  onChange={(value) => setNewReview({ ...newReview, rate: value })}/>
          <textarea className="title-input"
            type='text'
            placeholder='Write your review!'
            onChange={handleChange}
            value={newReview.text}
            name='text'
          />
          <button>Post</button>
          
        </Row>
      </Col>
      <div className='error'>
        {postError && <Error error={postError} />}
      </div>

      {reviews ?
        reviews.map(review => {
          const { text, rate, owner: { username }, id } = review
          return (
            <Fragment key={id}>
              {userIsOwner(review) ?
                <ReviewBox username={username} truck={truck} getTruck={getTruck} truckError={truckId} />
                :
                <div className='reviews-section'>
                  <h4 className='user-name'>{username}</h4>
                  <p className='posted-reviews'>{rate}</p>
                  <p className='posted-reviews'>{text}</p>
                </div>
              }
            </Fragment>
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