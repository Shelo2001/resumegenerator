import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Educations from './pages/Educations'
import Experiences from './pages/Experiences'
import Landing from './pages/Landing'
import PersonalInfo from './pages/PersonalInfo'
import ResumeReview from './pages/ResumeReview'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/resume/1' element={<PersonalInfo />} />
        <Route path='/resume/2' element={<Experiences />} />
        <Route path='/resume/3' element={<Educations />} />
        <Route path='/resume/overview' element={<ResumeReview />} />
      </Routes>
    </Router>
  )
}

export default App
