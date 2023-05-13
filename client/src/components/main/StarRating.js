import { useState, useEffect } from 'react'
import { FaStar } from 'react-icons/fa'

function StarRating(props) {
  const { value, onChange } = props
  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)



  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1

        return (
          <label key={index}>
            <input
              type='radio'
              name='rate'
              value={ratingValue}
              onClick={() => {
                setRating(ratingValue)
                if (onChange) {
                  onChange(ratingValue)
                }
              }}
            />
            <FaStar
              className='star'
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              size={25}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        )
      })}
    </div>
  )
}

export default StarRating