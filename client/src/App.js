import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Components
import Home from './components/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Map from './components/main/Map'
import Trucks from './components/main/Trucks'
import TruckSingle from './components/main/TruckSingle'
import Profile from './components/main/Profile'
import PageNotFound from './components/common/PageNotFound'
import Footer from './components/common/Footer'


const App = () => {

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/trucks/') // * <-- replace with your endpoint
      console.log(data)
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
          <Route path="/trucks" element={<Trucks />} />
          <Route path="/truck/:truckId" element={<TruckSingle />} />
          <Route path="/user/:userId" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
