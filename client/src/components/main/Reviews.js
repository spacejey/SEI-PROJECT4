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
    rate: '',
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
            value={newReview.text}
            name='text'
          />
          <select name="rate" onChange={handleChange} value={newReview.rate}>
            <option value="" defaultValue disabled>select rating</option>
            <option value="" defaultValue disabled>1</option>
            <option value="" defaultValue disabled>2</option>
            <option value="" defaultValue disabled>3</option>
            <option value="" defaultValue disabled>4</option>
            <option value="" defaultValue disabled>5</option>
          </select>
          <button>Post</button>
        </Row>
      </Col>
    </div>
  )
}


export default ReviewPage