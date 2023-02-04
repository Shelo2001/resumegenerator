import React from 'react'
import LiveResume from '../components/LiveResume'
import { Link } from 'react-router-dom'
import backarrow from '../assets/backarrow.svg'

const Experience = () => {
  return (
    <div className='personal-info-wrapper'>
      <div className='personal-info-container'>
        <Link to='/'>
          <button className='back-button'>
            <img src={backarrow} />
          </button>
        </Link>

        <div className='navbar-container'>
          <h2>გამოცდილება</h2>
          <h2>2/3</h2>
        </div>
      </div>

      <LiveResume />
    </div>
  )
}

export default Experience
