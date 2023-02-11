import React, { useEffect, useState } from 'react'
import LiveResume from '../components/LiveResume'
import { Link, useNavigate } from 'react-router-dom'
import backarrow from '../assets/backarrow.svg'

import successsvg from '../assets/Vector.svg'
import errorsvg from '../assets/Vector (1).svg'
import { useDispatch, useSelector } from 'react-redux'
import { getDegrees, storeResume } from '../features/personSlice'
import {
  descriptionValidation,
  employerValidation,
  positionValidation,
} from '../Validations'
import { addPersonEducation } from '../features/personSlice'

const Education = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { degrees } = useSelector((state) => state.person)

  const [array, setArray] = useState([0])
  const [description, setDescription] = useState(
    localStorage.getItem('education_description') || ''
  )
  const [institute, setInstitute] = useState(
    localStorage.getItem('institute') || ''
  )
  const [degree, setDegree] = useState('')
  const [due_date, setDue_date] = useState('')

  const [descriptionError, setDescriptionError] = useState('')
  const [instituteError, setInstituteError] = useState('')
  const [degreeError, setDegreeError] = useState('')
  const [touchedDescription, setTouchedDescription] = useState(false)

  useEffect(() => {
    dispatch(getDegrees())
  }, [])
  useEffect(() => {
    if (touchedDescription) {
      setDescriptionError(descriptionValidation(description))
    }
  }, [description, touchedDescription])

  useEffect(() => {
    localStorage.setItem('degree', degree)
    localStorage.setItem('due_date', due_date)
  }, [degree, due_date])

  const onClickHandler = () => {
    let newarray = array
    newarray.push({
      description,
      institute,
      degree_id: degree,
      due_date,
    })
    setArray([...newarray])
    setInstitute('')
    setDegree('')
    setDescription('')
    setDescriptionError('')
    setTouchedDescription(false)
    dispatch(addPersonEducation(array))
    window.scroll(0, 1000)
  }

  useEffect(() => {
    setInstituteError(positionValidation(institute))
    setDegreeError(employerValidation(degree))
    if (touchedDescription) {
      setDescriptionError(descriptionValidation(description))
    }
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: 'smooth',
    })
  }, [institute, degree, description, touchedDescription])

  const submitHandler = () => {
    let newarray = array
    newarray.push({
      description,
      institute,
      degree_id: degree,
      due_date,
    })
    setArray([...newarray])

    dispatch(addPersonEducation(array))

    const person_info = JSON.parse(localStorage.getItem('person_info'))
    const person_experience = JSON.parse(
      localStorage.getItem('person_experience')
    )
    const person_education = JSON.parse(
      localStorage.getItem('person_education')
    )
    let phone_number = person_info.phone_number.replace(/ /g, '')

    person_experience.shift()
    person_education.shift()

    const url = person_info.image
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'File name', { type: 'image/png' })

        localStorage.clear()

        const data = {
          name: person_info.name,
          surname: person_info.surname,
          email: person_info.email,
          phone_number,
          experiences: person_experience,
          educations: person_education,
          image: file,
          about_me: person_info.about_me,
        }

        dispatch(storeResume(data))
        navigate('/resume/overview')
      })
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
          <h2>განათლება</h2>
          <h2>3/3</h2>
        </div>
      </div>
      <div className='form-container'>
        {array.map((a, i) => (
          <>
            <div className='position-container'>
              {instituteError ? (
                <>
                  {' '}
                  <label for='institute' className='labelerror'>
                    სასწავლებელი
                  </label>
                  <input
                    onChange={(e) => setInstitute(e.target.value)}
                    onKeyUp={(e) =>
                      localStorage.setItem('institute', e.target.value)
                    }
                    placeholder='სასწავლებელი'
                    className={instituteError ? 'error' : ''}
                    type='text'
                    value={institute}
                    name='institute'
                  />
                  <span>
                    <img src={errorsvg} />
                  </span>
                  <p>{instituteError}</p>
                </>
              ) : (
                <>
                  {' '}
                  <label for='institute'>სასწავლებელი</label>
                  <input
                    onChange={(e) => setInstitute(e.target.value)}
                    onKeyUp={(e) =>
                      localStorage.setItem('institute', e.target.value)
                    }
                    placeholder='სასწავლებელი'
                    type='text'
                    value={institute}
                    name='institute'
                    className={
                      instituteError
                        ? 'error'
                        : institute.length == 0
                        ? ''
                        : 'success'
                    }
                  />
                  {institute.length !== 0 && (
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
                <label for='degree'>ხარისხი</label>
                <select
                  value={degree}
                  onSelect={(e) =>
                    localStorage.setItem('degree', e.target.value)
                  }
                  onChange={(e) => setDegree(e.target.value)}
                >
                  <option value='' disabled hidden>
                    აირჩიეთ ხარისხი
                  </option>
                  {degrees.map((degree) => (
                    <option value={degree.id}>{degree.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label for='enddate'>დამთავრების რიცხვი</label>
                <input
                  onChange={(e) => setDue_date(e.target.value)}
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
                      localStorage.setItem(
                        'education_description',
                        e.target.value
                      )
                    }
                    value={description}
                    placeholder='განათლების აღწერა'
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
                  <label for='description'>აღწერა</label>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    onKeyUp={(e) =>
                      localStorage.setItem(
                        'education_description',
                        e.target.value
                      )
                    }
                    onBlur={(e) => setTouchedDescription(true)}
                    placeholder='განათლების აღწერა'
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

        <button onClick={onClickHandler} className='more-experience-button'>
          სხვა სასწავლებლის დამატება
        </button>
        <div className='education-button-group'>
          <Link to='/resume/2'>
            <button className='purple-button'>უკან</button>
          </Link>

          <button onClick={submitHandler} className='purple-button'>
            დასრულება
          </button>
        </div>
      </div>

      <LiveResume education={array} />
    </div>
  )
}

export default Education
