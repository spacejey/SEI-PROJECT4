import React from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.scss'
import App from './App'

require('dotenv').config()
createRoot(document.getElementById('root')).render(<App />)