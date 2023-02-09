import React, { useEffect, useState } from 'react'
import LiveResume from '../components/LiveResume'
import { Link, useNavigate } from 'react-router-dom'
import backarrow from '../assets/backarrow.svg'
import {
  descriptionValidation,
  employerValidation,
  positionValidation,
} from '../Validations.jsx'
import successsvg from '../assets/Vector.svg'
import errorsvg from '../assets/Vector (1).svg'
import { useDispatch, useSelector } from 'react-redux'
import { addPersonExperience } from '../features/personSlice'

const Experience = () => {
  const [experiences, setexperiences] = useState([0])
  const [position, setPosition] = useState(
    localStorage.getItem('position') || ''
  )
  const [employer, setEmployer] = useState(
    localStorage.getItem('employer') || ''
  )
  const [start_date, setStart_date] = useState(
    localStorage.getItem('start_date') || ''
  )
  const [due_date, setdue_date] = useState(
    localStorage.getItem('due_date') || ''
  )
  const [description, setDescription] = useState(
    localStorage.getItem('description') || ''
  )
  const [positionError, setPositionError] = useState('')
  const [employerError, setEmployerError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [touchedDescription, setTouchedDescription] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onClickHandler = () => {
    if (!employer) {
      setEmployerError('asd')
    } else if (!position) {
      setPositionError('dsa')
    } else if (!description) {
      setDescriptionError('dsa')
    } else {
      let newexperiences = experiences
      newexperiences.push({
        position,
        employer,
        start_date,
        due_date,
        description,
      })
      setexperiences([...newexperiences])
      setPosition('')
      setEmployer('')
      setDescription('')
      setDescriptionError('')
      setTouchedDescription(false)
      dispatch(addPersonExperience(experiences))
      window.scroll(0, 1000)
    }
  }

  useEffect(() => {
    setPositionError(positionValidation(position))
    setEmployerError(employerValidation(employer))
    if (touchedDescription) {
      setDescriptionError(descriptionValidation(description))
    }
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: 'smooth',
    })
  }, [position, employer, description, touchedDescription])

  const submitHandler = () => {
    if (!employer || !position || !start_date || !due_date || !description) {
    } else {
      experiences.push({
        position,
        employer,
        start_date,
        due_date,
        description,
      })

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
        {experiences.map((a, i) => (
          <>
            <div className='position-container'>
              {positionError ? (
                <>
                  <label for='position' className='labelerror'>
                    თანამდებობა
                  </label>
                  <input
                    onChange={(e) => setPosition(e.target.value)}
                    onKeyUp={(e) =>
                      localStorage.setItem('position', e.target.value)
                    }
                    placeholder='დეველოპერი, დიზაინერი, ა.შ.'
                    value={position}
                    type='text'
                    name='position'
                    className={positionError ? 'error' : ''}
                  />
                  <span>
                    <img src={errorsvg} />
                  </span>
                  <p>{positionError}</p>
                </>
              ) : (
                <>
                  <label for='position'>თანამდებობა</label>
                  <input
                    onChange={(e) => setPosition(e.target.value)}
                    onKeyUp={(e) =>
                      localStorage.setItem('position', e.target.value)
                    }
                    placeholder='დეველოპერი, დიზაინერი, ა.შ.'
                    value={position}
                    type='text'
                    name='position'
                    className={
                      positionError
                        ? 'error'
                        : position.length == 0
                        ? ''
                        : 'success'
                    }
                  />
                  {position.length !== 0 && (
                    <span>
                      <img src={successsvg} />
                    </span>
                  )}
                  <p>მინიმუმ 2 სიმბოლო</p>
                </>
              )}
            </div>
            <div className='employer-container'>
              {employerError ? (
                <>
                  <label for='employer' className='labelerror'>
                    დამსაქმებელი
                  </label>
                  <input
                    onChange={(e) => setEmployer(e.target.value)}
                    onKeyUp={(e) =>
                      localStorage.setItem('employer', e.target.value)
                    }
                    value={employer}
                    placeholder='დამსაქმებელი'
                    type='text'
                    name='position'
                    className={employerError ? 'error' : ''}
                  />
                  <span>
                    <img src={errorsvg} />
                  </span>
                  <p>{employerError}</p>
                </>
              ) : (
                <>
                  <label for='employer'>დამსაქმებელი</label>
                  <input
                    onChange={(e) => setEmployer(e.target.value)}
                    onKeyUp={(e) =>
                      localStorage.setItem('employer', e.target.value)
                    }
                    placeholder='დამსაქმებელი'
                    value={employer}
                    type='text'
                    name='employer'
                    className={
                      employerError
                        ? 'error'
                        : employer.length == 0
                        ? ''
                        : 'success'
                    }
                  />
                  {employer.length !== 0 && (
                    <span>
                      <img src={successsvg} />
                    </span>
                  )}
                  <p>მინიმუმ 2 სიმბოლო</p>
                </>
              )}
            </div>
            <div className='date-container'>
              <div>
                <label for='start_date'>დაწყების რიცხვი</label>
                <input
                  onChange={(e) => setStart_date(e.target.value)}
                  onKeyUp={(e) =>
                    localStorage.setItem('start_date', e.target.value)
                  }
                  value={start_date}
                  type='date'
                  name='start_date'
                />
              </div>
              <div>
                <label for='due_date'>დამთავრების რიცხვი</label>
                <input
                  onChange={(e) => setdue_date(e.target.value)}
                  onKeyUp={(e) =>
                    localStorage.setItem('due_date', e.target.value)
                  }
                  value={due_date}
                  name='due_date'
                  type='date'
                />
              </div>
            </div>
            <div className='description-container'>
              {descriptionError ? (
                <>
                  <label for='description'>აღწერა</label>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    onKeyUp={(e) =>
                      localStorage.setItem('description', e.target.value)
                    }
                    value={description}
                    placeholder='როლი თანამდებობაზე და ზოგადი აღწერა'
                    name='description'
                    className={
                      descriptionError
                        ? 'error'
                        : description.length == 0
                        ? ''
                        : ''
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
                </>
              ) : (
                <>
                  {' '}
                  <label for='description'>აღწერა</label>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    onKeyUp={(e) =>
                      localStorage.setItem('description', e.target.value)
                    }
                    onBlur={(e) => setTouchedDescription(true)}
                    placeholder='როლი თანამდებობაზე და ზოგადი აღწერა'
                    name='description'
                    value={description}
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
                </>
              )}
            </div>
            <hr style={{ width: '100%', marginTop: '50px' }} />
          </>
        ))}

        <button className='more-experience-button' onClick={onClickHandler}>
          მეტი გამოცდილების დამატება
        </button>
        <div className='button-group'>
          <Link to='/resume/1'>
            <button className='purple-button'>უკან</button>
          </Link>

          <button className='purple-button' onClick={submitHandler}>
            შემდეგი
          </button>
        </div>
      </div>

      <LiveResume experience={experiences} />
    </div>
  )
}

export default Experience
