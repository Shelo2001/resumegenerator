import React from 'react'
import '../global.scss'
import logo from '../assets/logo3.png'
import email from '../assets/email.svg'
import phone from '../assets/phone.png'
import { useSelector } from 'react-redux'

const ResumeReview = () => {
  return (
    <div className='live-resume-container'>
      <div className='person-info-container'>
        <div className='person-info-left'>
          <div className='person-name-surname'></div>
          <div className='person-contact'>
            <div></div>
            <div></div>
          </div>
          <div className='person-about-me'></div>
        </div>
        <div className='person-info-right'></div>
      </div>

      <div className='person-experience'></div>

      <div className='person-experience'></div>
      <img className='logo-img' width='50px' height='50px' src={logo} />
    </div>
  )
}

export default ResumeReview
