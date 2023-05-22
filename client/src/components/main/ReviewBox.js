import { useState } from 'react'

// Error
import Error from '../common/Error'

// Boostrap 
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

// Custom components
import { authenticated } from '../../helpers/auth'

const ReviewBox = ({ rate, username, id, text, truckId }) => {

  // States
  const [ editedReview, setEditedReview ] = useState({
    text: '',
    rate: '',
  })
  const [ editCheck, setEditCheck ] = useState(false)
  const [ editError, setEditError ] = useState('')

  // ! Executions
  const handleEdit = () => {
    setEditCheck(!editCheck)
    setEditError('')
  }

  const handleChangeEdit = (e) => {
    setEditedReview({ ...editedReview, text: e.target.value })
    setEditError('')
  }

  const handleSubmitEdit = async (e, id) => {
    e.preventDefault()
    try {
      await authenticated.put(`/api/reviews/${id}/`, editedReview)
      setEditedReview({ text: '' })
      setEditCheck(false)
    } catch (err) {
      console.log(err.response)
      setEditError('')
    }
  }

  const handleDelete = async (e, id) => {
    try {
      await authenticated.delete(`/api/reviews/${id}/`)
      alert('Do you want to delete your comment?')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      {editCheck ?
        <Container>
          <Col as='form' onSubmit={(e) => handleSubmitEdit(e, id)}>
            <button className='edit' onClick={(e) => handleChangeEdit(e, id)}>Edit</button>
            <Col className='edit-box'>
              <input type='text' className='edit-input' onChange={handleChangeEdit} value={editedReview.text}/>
              {editError && <Error error={editError}/>}
            </Col>
          </Col>
        </Container>
        :
        <p>{text}</p>
      }
    </div>
  )
}

export default ReviewBox