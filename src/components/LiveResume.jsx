import React, { useEffect } from 'react'
import '../global.scss'
import logo from '../assets/logo3.png'
import { useDispatch, useSelector } from 'react-redux'
import { getDegrees } from '../features/personSlice'

const LiveResume = ({ person, experience, education }) => {
  const personInfo = JSON.parse(localStorage.getItem('person_info'))
  const personExperience = JSON.parse(localStorage.getItem('person_experience'))
  const personEducation = JSON.parse(
    localStorage.getItem('person_education') ||
      localStorage.getItem('educations')
  )
  const dispatch = useDispatch()
  const { degrees } = useSelector((state) => state.person)

  useEffect(() => {
    dispatch(getDegrees())
  }, [])

  return (
    <div className='live-resume-container'>
      <div className='person-info-container'>
        <div className='person-info-left'>
          <div className='person-name-surname'>
            {person?.name || person?.surname ? (
              <p>
                {person?.name} {person?.surname}
              </p>
            ) : (
              <p>
                {personInfo?.name} {personInfo?.surname}
              </p>
            )}
          </div>
          <div className='person-contact'>
            <div>
              {person?.email ? (
                <>
                  <i class='fa-solid fa-at'></i>
                  <span>{person?.email}</span>
                </>
              ) : personInfo?.email ? (
                <>
                  <i class='fa-solid fa-at'></i>
                  <span>{personInfo?.email}</span>
                </>
              ) : (
                <></>
              )}
            </div>
            <div>
              {person?.phone_number ? (
                <>
                  <i class='fa-solid fa-phone'></i>
                  <span>{person?.phone_number}</span>
                </>
              ) : personInfo?.phone_number ? (
                <>
                  <i class='fa-solid fa-phone'></i>
                  <span>{personInfo?.phone_number}</span>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className='person-about-me'>
            {person?.about_me ? (
              <>
                <p className='about-me-header'>ᲩᲔᲛ ᲨᲔᲡᲐᲮᲔᲑ</p>
                <div>
                  <p className='about-me'>{person?.about_me}</p>
                </div>
              </>
            ) : personInfo?.about_me ? (
              <>
                <p className='about-me-header'>ᲩᲔᲛ ᲨᲔᲡᲐᲮᲔᲑ</p>
                <div>
                  <p className='about-me'>{personInfo?.about_me}</p>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className='person-info-right'>
          {person?.image ? (
            <img
              className='person-image'
              src={URL.createObjectURL(person?.image)}
            />
          ) : personInfo?.image ? (
            <img className='person-image' src={personInfo?.image} />
          ) : (
            <></>
          )}
        </div>
      </div>
      {personInfo?.name && <hr />}
      <div className='person-experience'>
        {personInfo?.name && (
          <div className='person-experience-header'>
            <p>ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ</p>
          </div>
        )}
        {experience
          ? experience?.map((item) => (
              <>
                <div className='person-experience-position'>
                  <p className='position'>
                    {item.position}
                    {item.position.length > 0 && ', '}
                    {item.employer}
                  </p>
                  <p className='dates'>
                    {item.start_date}
                    {item.start_date.length > 0 && ' - '}
                    {item.due_date}
                  </p>
                </div>
                <div className='description'>
                  <p>{item.description}</p>
                </div>
              </>
            ))
          : personExperience?.map((item) => (
              <>
                <div className='person-experience-position'>
                  <p className='position'>
                    {item.position}, {item.employer}
                  </p>
                  <p className='dates'>
                    {item.start_date} - {item.due_date}
                  </p>
                </div>
                <div className='description'>
                  <p>{item.description}</p>
                </div>
              </>
            ))}
      </div>
      {personExperience ? <hr /> : <></>}
      <div className='person-experience'>
        {personExperience ? (
          <div className='person-experience-header'>
            <p>ᲒᲐᲜᲐᲗᲚᲔᲑᲐ</p>
          </div>
        ) : (
          <></>
        )}
        {education
          ? education?.map((item) => (
              <>
                <div className='person-experience-position'>
                  <p className='position'>
                    {item.institute}
                    {item.institute.length > 0 && ', '}
                    {degrees
                      .filter((degree) => degree.id == item.degree_id)
                      .map((p) => {
                        return p.title
                      })}
                  </p>
                  <p className='dates'>{item.due_date}</p>
                </div>
                <div className='description'>
                  <p>{item.description}</p>
                </div>
              </>
            ))
          : personEducation?.map((item) => (
              <>
                <div className='person-experience-position'>
                  <p className='position'>{item.institute}</p>
                  <p className='dates'>{item.due_date}</p>
                </div>
                <div className='description'>
                  <p>{item.description}</p>
                </div>
              </>
            ))}
      </div>
      {localStorage.getItem('name') && (
        <img className='logo-img' width='50px' height='50px' src={logo} />
      )}
    </div>
  )
}

export default LiveResume
