import React, { useState, useeffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// Custom Components
import { authenticated } from '../../helpers/auth'
import Spinner from '../common/Spinner'
import Error from '../common/Error'
import StarRating from '../main/StarRating'

const Reviews = () => {

  // Variables
  const { truckId } = useParams()
  const { userId } = useParams()

  // States
  const [ reviews, setReviews ] = useState([])
  const [ newReview, setNewReview ] = useState({
    text: '',
    rate: '',
    truck: truckId,
    user: userId,
  })
  

  return (

  )
}