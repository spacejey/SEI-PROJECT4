import React, { useState, useEffect } from 'react'
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



const ReviewPage = ({ truck, getTruck, truckError }) => {
  const { truckId } = useParams()
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({
    text: '',
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
      const response = await authenticated.post('api/reviews/', newReview)
      
      // Update the reviews state
      setNewReview({ text: '' })
      setReviews([...reviews, response.data])

    } catch (err) {
      console.log(err.message)
      setPostError()
    }
  }




  return (
    <div>
      <Col as='form' onSubmit={handleSubmit} >
        <Row>
          <textarea className="title-input"
            type='text'
            placeholder='Write your review!'
            onChange={handleChange}
            name='title'
          />
          <button>Post</button>
        </Row>
      </Col>
      {/* {truck.reviews ?
        truck.reviews.map(review => {
          const { text, owner: { username }, id } = review
          return (
            <Col key={id}>
              {userIsOwner(review) ?
                <Row username={username} id={id} text={text} />
                :
                <div>
                  <h4>@{username}</h4>
                  <p>{text}</p>
                </div>
              }
            </Col>
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
      } */}
    </div>
  )
}


export default ReviewPage