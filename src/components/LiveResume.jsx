import React from 'react'
import '../global.scss'
import logo from '../assets/logo3.png'
import { useSelector } from 'react-redux'

const LiveResume = ({ person, experience }) => {
  const { person_info } = useSelector((state) => state.person)

  return (
    <div className='live-resume-container'>
      {person?.name ? <p>{person.name}</p> : <p>{person_info.name}</p>}
      {person?.surname ? <p>{person.surname}</p> : <p>{person_info.surname}</p>}
      {person?.image ? (
        <img
          width='200px'
          height='200px'
          src={URL.createObjectURL(person?.image)}
        />
      ) : (
        <img width='200px' height='200px' src={person_info.image} />
      )}
      {person?.aboutme ? (
        <p>{person?.aboutme}</p>
      ) : (
        <p>{person_info?.aboutme}</p>
      )}
      {person?.email ? <p>{person?.email}</p> : <p>{person_info?.email}</p>}
      {person?.phoneNumber ? (
        <p>{person?.phoneNumber}</p>
      ) : (
        <p>{person_info?.phoneNumber}</p>
      )}
      {experience ? (
        experience.map((field) => (
          <>
            <p>{field.position}</p>
            <p></p>
          </>
        ))
      ) : (
        <></>
      )}
      <img width='50px' height='50px' src={logo} />
    </div>
  )
}

export default LiveResume
