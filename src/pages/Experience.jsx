import React, { useEffect, useState } from 'react'
import LiveResume from '../components/LiveResume'
import { Link } from 'react-router-dom'
import backarrow from '../assets/backarrow.svg'
import ExperienceForm from '../components/ExperienceForm'

const Experience = () => {
  const [array, setArray] = useState([0])

  const onClickHandler = () => {
    let newArray = array
    newArray.push(Math.random())
    setArray([...newArray])
  }

  return (
    <div className='experience-wrapper'>
      <div className='experience-container'>
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
      <div className='form-container'>
        {array.map((_, i) => (
          <>
            <ExperienceForm />
          </>
        ))}

        <button className='more-experience-button' onClick={onClickHandler}>
          მეტი გამოცდილების დამატება
        </button>
        <div>
          <Link to='/resume/1'>
            <button>უკან</button>
          </Link>

          <button>შემდეგი</button>
        </div>
      </div>

      <LiveResume />
    </div>
  )
}

export default Experience
