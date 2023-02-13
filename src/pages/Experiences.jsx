import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import LiveResume from '../components/LiveResume'
import { addPersonExperience } from '../features/personSlice'
import {
  descriptionValidation,
  employerValidation,
  positionValidation,
} from '../Validations'
import backarrow from '../assets/backarrow.svg'
import successsvg from '../assets/Vector.svg'
import errorsvg from '../assets/Vector (1).svg'

const Experience = ({
  position,
  employer,
  start_date,
  due_date,
  description,
  index,
  handleChange,
}) => {
  const [positionError, setPositionError] = useState('')
  const [employerError, setEmployerError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [touchedDescription, setTouchedDescription] = useState(false)

  useEffect(() => {
    setPositionError(positionValidation(position))
    setEmployerError(employerValidation(employer))
    if (touchedDescription) {
      setDescriptionError(descriptionValidation(description))
    }
  }, [position, employer, description, touchedDescription])

  return (
    <>
      {positionError ? (
        <div className='position-container'>
          <label for='position'>თანამდებობა</label>
          <input
            type='text'
            value={position}
            className={positionError ? 'error' : ''}
            name={`position-${index}`}
            onChange={handleChange}
          />
          <span>
            <img src={errorsvg} />
          </span>
          <p>{positionError}</p>
        </div>
      ) : (
        <div className='position-container'>
          <label for='position'>თანამდებობა</label>
          <input
            type='text'
            value={position}
            name={`position-${index}`}
            onChange={handleChange}
            className={
              positionError ? 'error' : position.length == 0 ? '' : 'success'
            }
          />
          {position.length !== 0 && (
            <span>
              <img src={successsvg} />
            </span>
          )}
          <p>მინიმუმ 2 სიმბოლო</p>
        </div>
      )}
      {employerError ? (
        <div className='employer-container'>
          <label for='employer'>დამსაქმებელი</label>
          <input
            type='text'
            value={employer}
            name={`employer-${index}`}
            className={employerError ? 'error' : ''}
            onChange={handleChange}
          />
          <span>
            <img src={errorsvg} />
          </span>
          <p>{employerError}</p>
        </div>
      ) : (
        <div className='employer-container'>
          <label for='employer'>დამსაქმებელი</label>
          <input
            type='text'
            value={employer}
            name={`employer-${index}`}
            onChange={handleChange}
            className={
              employerError ? 'error' : employer.length == 0 ? '' : 'success'
            }
          />
          {employer.length !== 0 && (
            <span>
              <img src={successsvg} />
            </span>
          )}
          <p>მინიმუმ 2 სიმბოლო</p>
        </div>
      )}
      <div className='date-container'>
        <div>
          <label for='start_date'>დაწყების რიცხვი</label>
          <input
            type='date'
            value={start_date}
            name={`start_date-${index}`}
            onChange={handleChange}
          />
        </div>
        <div>
          <label for='start_date'>დამთავრების რიცხვი</label>
          <input
            type='date'
            value={due_date}
            name={`due_date-${index}`}
            onChange={handleChange}
          />
        </div>
      </div>

      {descriptionError ? (
        <div className='description-container'>
          <label for='description'>აღწერა</label>
          <textarea
            value={description}
            name={`description-${index}`}
            onBlur={(e) => setTouchedDescription(true)}
            onChange={handleChange}
            className={
              descriptionError ? 'error' : description.length == 0 ? '' : ''
            }
          />
          {touchedDescription && !description && (
            <>
              <span>
                <img src={errorsvg} />
              </span>
              <p>{descriptionError}</p>
            </>
          )}
        </div>
      ) : (
        <div className='description-container'>
          <label for='description'>აღწერა</label>
          <textarea
            value={description}
            name={`description-${index}`}
            onBlur={(e) => setTouchedDescription(true)}
            onChange={handleChange}
            className={
              descriptionError
                ? 'error'
                : description.length == 0
                ? ''
                : 'success'
            }
          />
          {description.length !== 0 && (
            <span>
              <img src={successsvg} />
            </span>
          )}
        </div>
      )}
      <hr style={{ width: '100%', marginTop: '50px' }} />
    </>
  )
}

const Experiences = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [experiences, setExperiences] = useState(
    JSON.parse(localStorage.getItem('person_experience')) ||
      JSON.parse(localStorage.getItem('experiences')) || [
        {
          position: '',
          employer: '',
          start_date: '',
          due_date: '',
          description: '',
        },
      ]
  )

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    setExperiences(
      experiences.map((experience, index) => {
        if (name === `position-${index}`) {
          return { ...experience, position: value }
        } else if (name === `employer-${index}`) {
          return { ...experience, employer: value }
        } else if (name === `start_date-${index}`) {
          return { ...experience, start_date: value }
        } else if (name === `due_date-${index}`) {
          return { ...experience, due_date: value }
        } else if (name === `description-${index}`) {
          return { ...experience, description: value }
        } else {
          return experience
        }
      })
    )
    localStorage.setItem('experiences', JSON.stringify(experiences))
  }

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      {
        position: '',
        employer: '',
        start_date: '',
        due_date: '',
        description: '',
      },
    ])
    localStorage.setItem('experiences', JSON.stringify(experiences))
  }

  const submitHandler = () => {
    const isEmpty = experiences.map((experience) => {
      return (
        experience.position == '' ||
        experience.employer == '' ||
        experience.start_date == '' ||
        experience.due_date == '' ||
        experience.description == ''
      )
    })

    if (isEmpty.slice(-1)[0] === true) {
      console.log(isEmpty)
    } else {
      setExperiences([...experiences])
      dispatch(addPersonExperience(experiences))
      navigate('/resume/3')
    }
  }

  return (
    <div className='experience-wrapper'>
      <div className='experience-container'>
        <Link to='/'>
          <button
            onClick={() => {
              localStorage.clear()
            }}
            className='back-button'
          >
            <img src={backarrow} />
          </button>
        </Link>
        <div className='navbar-container'>
          <h2>გამოცდილება</h2>
          <h2>2/3</h2>
        </div>
      </div>
      <div className='form-container'>
        {experiences.map((exp, index) => (
          <Experience
            key={index}
            {...exp}
            index={index}
            handleChange={handleChange}
          />
        ))}
        <button
          onClick={handleAddExperience}
          className='more-experience-button'
        >
          მეტი გამოცდილების დამატება
        </button>
        <div className='button-group'>
          <Link to='/resume/1'>
            <button className='purple-button'>უკან</button>
          </Link>

          <button onClick={submitHandler} className='purple-button'>
            შემდეგი
          </button>
        </div>
      </div>
      <LiveResume experience={experiences} />
    </div>
  )
}

export default Experiences
