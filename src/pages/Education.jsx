import React, { useEffect, useState } from 'react'
import LiveResume from '../components/LiveResume'
import { Link, useNavigate } from 'react-router-dom'
import backarrow from '../assets/backarrow.svg'

import successsvg from '../assets/Vector.svg'
import errorsvg from '../assets/Vector (1).svg'
import { useDispatch, useSelector } from 'react-redux'
import { getDegrees } from '../features/personSlice'
import { descriptionValidation } from '../Validations'

const Education = () => {
  const dispatch = useDispatch()
  const { degrees } = useSelector((state) => state.person)

  const [description, setDescription] = useState(
    localStorage.getItem('education_description') || ''
  )
  const [descriptionError, setDescriptionError] = useState('')
  const [touchedDescription, setTouchedDescription] = useState(false)

  useEffect(() => {
    dispatch(getDegrees())
  }, [])
  useEffect(() => {
    if (touchedDescription) {
      setDescriptionError(descriptionValidation(description))
    }
  }, [description, touchedDescription])

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
          <h2>განათლება</h2>
          <h2>3/3</h2>
        </div>
      </div>
      <div className='form-container'>
        <div className='position-container'>
          <label for='position'>სასწავლებელი</label>
          <input placeholder='სასწავლებელი' type='text' name='position' />
        </div>
        <div className='date-container'>
          <div>
            <label for='startdate'>ხარისხი</label>
            <select>
              <option value='' disabled selected hidden>
                აირჩიეთ ხარისხი
              </option>
              {degrees.map((degree) => (
                <option value={degree.title}>{degree.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label for='enddate'>დამთავრების რიცხვი</label>
            <input name='enddate' type='date' />
          </div>
        </div>
        <div className='description-container'>
          {descriptionError ? (
            <>
              <label for='description'>აღწერა</label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                onKeyUp={(e) =>
                  localStorage.setItem('education_description', e.target.value)
                }
                value={description}
                placeholder='როლი თანამდებობაზე და ზოგადი აღწერა'
                name='description'
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
            </>
          ) : (
            <>
              <label for='description'>აღწერა</label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                onKeyUp={(e) =>
                  localStorage.setItem('education_description', e.target.value)
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

        <button className='more-experience-button'>
          სხვა სასწავლებლის დამატება
        </button>
        <div className='education-button-group'>
          <Link to='/resume/2'>
            <button className='purple-button'>უკან</button>
          </Link>

          <button className='purple-button'>შემდეგი</button>
        </div>
      </div>

      <LiveResume />
    </div>
  )
}

export default Education
