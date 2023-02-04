import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import PersonalInfo from './pages/PersonalInfo'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/resume/1' element={<PersonalInfo />} />
      </Routes>
    </Router>
  )
}

export default App
