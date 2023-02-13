import React from 'react'
import logo from '../assets/logo.png'
import logo2 from '../assets/logo2.png'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className='landing-container'>
      <div className='menu'>
        <div className='navbar'>
          <img src={logo} />
        </div>
      </div>
      <div>
        <div className='landing-content'>
          <Link to='/resume/1'>
            <button>ᲠᲔᲖᲘᲣᲛᲔᲡ ᲓᲐᲛᲐᲢᲔᲑᲐ</button>
          </Link>
        </div>
        <img className='landing-img' src={logo2} />
      </div>
    </div>
  )
}

export default Landing
