import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addPersonEducation,
  getDegrees,
  storeResume,
} from '../features/personSlice'
import backarrow from '../assets/backarrow.svg'
import successsvg from '../assets/Vector.svg'
import errorsvg from '../assets/Vector (1).svg'
import { Link } from 'react-router-dom'
import LiveResume from '../components/LiveResume'
import { descriptionValidation, positionValidation } from '../Validations'

const Education = ({
  description,
  institute,
  degree_id,
  due_date,
  index,
  handleChange,
}) => {
  const dispatch = useDispatch()
  const { degrees } = useSelector((state) => state.person)

  const [touchedDescription, setTouchedDescription] = useState(false)
  const [descriptionError, setDescriptionError] = useState('')
  const [instituteError, setInstituteError] = useState('')

  useEffect(() => {
    dispatch(getDegrees())
  }, [])

  useEffect(() => {
    setInstituteError(positionValidation(institute))
    if (touchedDescription) {
      setDescriptionError(descriptionValidation(description))
    }
  }, [institute, touchedDescription, description])

  return (
    <>
      {instituteError ? (
        <div className='position-container'>
          <label for='institute'>სასწავლებელი</label>
          <input
            type='text'
            placeholder='სასწავლებელი'
            value={institute}
            className={instituteError ? 'error' : ''}
            name={`institute-${index}`}
            onChange={handleChange}
          />
          <span>
            <img src={errorsvg} />
          </span>
          <p>{instituteError}</p>
        </div>
      ) : (
        <div className='position-container'>
          <label for='institute'>სასწავლებელი</label>
          <input
            type='text'
            value={institute}
            placeholder='სასწავლებელი'
            name={`institute-${index}`}
            onChange={handleChange}
            className={
              instituteError ? 'error' : institute.length == 0 ? '' : 'success'
            }
          />
          {institute.length !== 0 && (
            <span>
              <img src={successsvg} />
            </span>
          )}
          <p>მინიმუმ 2 სიმბოლო</p>
        </div>
      )}
      <div className='date-container'>
        <div>
          <label for='degree'>ხარისხი</label>
          <select
            name={`degree_id-${index}`}
            value={degree_id}
            onChange={handleChange}
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
            placeholder='განათლების აღწერა'
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
            placeholder='განათლების აღწერა'
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

const Educations = () => {
  const [educations, setEducations] = useState(
    JSON.parse(localStorage.getItem('person_education')) ||
      JSON.parse(localStorage.getItem('educations')) || [
        {
          description: '',
          institute: '',
          degree_id: '',
          due_date: '',
        },
      ]
  )

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    setEducations(
      educations.map((education, index) => {
        if (name === `description-${index}`) {
          return { ...education, description: value }
        } else if (name === `institute-${index}`) {
          return { ...education, institute: value }
        } else if (name === `degree_id-${index}`) {
          return { ...education, degree_id: value }
        } else if (name === `due_date-${index}`) {
          return { ...education, due_date: value }
        } else {
          return education
        }
      })
    )
  }

  console.log(educations)

  const handleAddEducation = () => {
    setEducations([
      ...educations,
      {
        description: '',
        institute: '',
        degree_id: '',
        due_date: '',
      },
    ])
    localStorage.setItem('educations', JSON.stringify(educations))
  }

  const dispatch = useDispatch()

  const submitHandler = () => {
    const isEmpty = educations.map((experience) => {
      return (
        experience.institute == '' ||
        experience.degree_id == '' ||
        experience.due_date == '' ||
        experience.description == ''
      )
    })

    if (isEmpty.slice(-1)[0] === true) {
      console.log(isEmpty)
    } else {
      setEducations([...educations])

      dispatch(addPersonEducation(educations))

      const person_info = JSON.parse(localStorage.getItem('person_info'))
      const person_experience = JSON.parse(
        localStorage.getItem('person_experience')
      )
      const person_education = JSON.parse(
        localStorage.getItem('person_education')
      )
      let phone_number = person_info.phone_number.replace(/ /g, '')

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
        })
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
          <h2>განათლება</h2>
          <h2>3/3</h2>
        </div>
      </div>
      <div className='form-container'>
        {educations.map((ed, index) => (
          <Education
            key={index}
            {...ed}
            index={index}
            handleChange={handleChange}
          />
        ))}
        <button onClick={handleAddEducation} className='more-experience-button'>
          სხვა სასწავლებლის დამატება
        </button>
        <div className='education-button-group'>
          <Link to='/resume/2'>
            <button className='purple-button'>უკან</button>
          </Link>

          <button className='purple-button' onClick={submitHandler}>
            დასრულება
          </button>
        </div>
      </div>

      <LiveResume education={educations} />
    </div>
  )
}

export default Educations
