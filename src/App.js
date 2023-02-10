import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Education from './pages/Education'
import Experience from './pages/Experience'
import Landing from './pages/Landing'
import PersonalInfo from './pages/PersonalInfo'
import ResumeReview from './pages/ResumeReview'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/resume/1' element={<PersonalInfo />} />
        <Route path='/resume/2' element={<Experience />} />
        <Route path='/resume/3' element={<Education />} />
        <Route path='/resume/overview' element={<ResumeReview />} />
      </Routes>
    </Router>
  )
}

export default App
