import { useState } from 'react'

// Error
import Error from '../common/Error'

// Boostrap 
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

// Custom components
import { authenticated } from '../../helpers/auth'

const ReviewBox = ({ rate, username, id, text, truckId, getTruck }) => {

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
      getTruck()
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
      getTruck()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div className='top-buttons'>
        <button className='delete' onClick={(e) => handleDelete(e, id)}>Delete</button>
      </div>
      {editCheck ?
        <Container>
          <Col as='form' onSubmit={(e) => handleSubmitEdit(e, id)}>
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