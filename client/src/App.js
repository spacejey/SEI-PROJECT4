import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Components
import Home from './components/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Map from './components/main/Map'
import TruckSingle from './components/main/TruckSingle'
import Profile from './components/main/Profile'
import Reviews from './components/main/Reviews'
import PageNotFound from './components/common/PageNotFound'
import PageNavbar from './components/common/PageNavBar'
import Footer from './components/common/Footer'
import { loggedInUser, authenticated } from './helpers/auth'


const App = () => {


  const [ user, setUser ] = useState([])
  const [ userError, setUserError ] = useState('')
  const getUser = useCallback(async () => {
    try {
      const { data } = await authenticated.get(`/api/users/${loggedInUser()}`)
      setUser({ ...data })
    } catch (err) {
      console.log(err)
      setUserError(err.message)
    }
  }, [])



  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/trucks/') // * <-- replace with your endpoint
    }
    getData()
  })

  return (
    <div className='site-wrapper'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/map" element={<Map />} />
          <Route path="/trucks/:truckId" element={<TruckSingle />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/user" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
} 

export default App
