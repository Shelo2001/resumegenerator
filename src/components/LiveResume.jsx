import React from 'react'
import '../global.scss'
import logo from '../assets/logo3.png'

const LiveResume = ({ person }) => {
  return (
    <div className='live-resume-container'>
      <p>{person?.name}</p>
      <p>{person?.surname}</p>
      {person?.image ? (
        <img width='200px' height='200px' src={person?.image} />
      ) : (
        <></>
      )}
      <p>{person?.aboutme}</p>
      <p>{person?.email}</p>
      <p>{person?.phoneNumber}</p>
      <img width='50px' height='50px' src={logo} />
    </div>
  )
}

export default LiveResume
