import React, { useEffect, useState } from 'react'
import LiveResume from '../components/LiveResume'
import { Link } from 'react-router-dom'
import backarrow from '../assets/backarrow.svg'
import {
  descriptionValidation,
  employerValidation,
  positionValidation,
} from '../Validations.jsx'
import successsvg from '../assets/Vector.svg'
import errorsvg from '../assets/Vector (1).svg'
import { useDispatch } from 'react-redux'
import { addPersonExperience } from '../features/personSlice'

const Experience = () => {
  const [array, setArray] = useState([0])
  const [position, setPosition] = useState(
    localStorage.getItem('position') || ''
  )
  const [employer, setEmployer] = useState(
    localStorage.getItem('employer') || ''
  )
  const [startdate, setStartdate] = useState(
    localStorage.getItem('startdate') || ''
  )
  const [enddate, setEnddate] = useState(localStorage.getItem('enddate') || '')
  const [description, setDescription] = useState(
    localStorage.getItem('description') || ''
  )
  const [positionError, setPositionError] = useState('')
  const [employerError, setEmployerError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [touchedDescription, setTouchedDescription] = useState(false)
  const dispatch = useDispatch()
  const onClickHandler = () => {
    if (!employer || !position || !startdate || !enddate || !description) {
    } else {
      let newArray = array
      newArray.push({ position, employer, startdate, enddate, description })
      setArray([...newArray])
      setPosition('')
      setEmployer('')
      setDescription('')
      setTouchedDescription(false)
    }
  }

  useEffect(() => {
    setPositionError(positionValidation(position))
    setEmployerError(employerValidation(employer))
    if (touchedDescription) {
      setDescriptionError(descriptionValidation(description))
    }
  }, [position, employer, description, touchedDescription])

  const submitHandler = () => {
    if (!employer || !position || !startdate || !enddate || !description) {
    } else {
      array.push({ position, employer, startdate, enddate, description })

      dispatch(addPersonExperience(array))
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
        {array.map((_, i) => (
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
                    placeholder='ანზორ'
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
                    placeholder='ანზორ'
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
                    placeholder='ანზორ'
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
                    placeholder='ანზორ'
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
                <label for='startdate'>დაწყების რიცხვი</label>
                <input
                  onChange={(e) => setStartdate(e.target.value)}
                  onKeyUp={(e) =>
                    localStorage.setItem('startdate', e.target.value)
                  }
                  value={startdate}
                  type='date'
                  name='startdate'
                />
              </div>
              <div>
                <label for='enddate'>დამთავრების რიცხვი</label>
                <input
                  onChange={(e) => setEnddate(e.target.value)}
                  onKeyUp={(e) =>
                    localStorage.setItem('enddate', e.target.value)
                  }
                  value={enddate}
                  name='enddate'
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
                    placeholder='ზოგადი ინფო შენ შესახებ'
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
                    placeholder='ზოგადი ინფო შენ შესახებ'
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

      <LiveResume />
    </div>
  )
}

export default Experience
