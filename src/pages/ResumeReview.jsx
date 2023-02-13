import React, { useEffect, useState } from 'react'
import '../global.scss'
import { Slide, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import backarrow from '../assets/backarrow.svg'
import logo from '../assets/logo3.png'

const ResumeReview = () => {
  const [show, setShow] = useState(false)
  const [resume, setResume] = useState(null)

  useEffect(() => {
    setShow(true)
    toast('რეზიუმე წარმატებით გაიგზავნა  🎉', {
      position: 'top-right',
      autoClose: 250000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    })
    setResume(JSON.parse(localStorage.getItem('resume_fulfilled')))
  }, [])

  return (
    <div>
      {show && <ToastContainer transition={Slide} />}
      <Link to='/'>
        <button
          onClick={() => {
            localStorage.clear()
          }}
          style={{ backgroundColor: '#F9F9F9' }}
          className='back-button'
        >
          <img src={backarrow} />
        </button>
      </Link>

      <div className='resume-review-container'>
        <div className='person-info-container'>
          <div className='person-info-left'>
            <div className='person-name-surname'>
              <p>
                {resume?.name} {resume?.surname}
              </p>
            </div>
            <div className='person-contact'>
              <div>
                <i class='fa-solid fa-at'></i>
                <a
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  href={`mailto:${resume?.email}`}
                >
                  &nbsp;&nbsp;&nbsp;{resume?.email}
                </a>
              </div>
              <div>
                <i class='fa-solid fa-phone'></i>
                <span>
                  &nbsp;&nbsp;&nbsp;
                  {resume?.phone_number.slice(0, 4)}&nbsp;
                  {resume?.phone_number.slice(4, 7)}&nbsp;
                  {resume?.phone_number.slice(7, 9)}&nbsp;
                  {resume?.phone_number.slice(9, 11)}&nbsp;
                  {resume?.phone_number.slice(11, 13)}
                </span>
              </div>
            </div>
            <div className='person-about-me'>
              {resume?.about_me ? (
                <>
                  <p className='about-me-header'>ᲩᲔᲛ ᲨᲔᲡᲐᲮᲔᲑ</p>
                  <div>
                    <p className='about-me'>{resume?.about_me}</p>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className='person-info-right'>
            <img
              className='person-image'
              src={`https://resume.redberryinternship.ge/${resume?.image}`}
            />
          </div>
        </div>

        <hr />

        <div className='person-experience'>
          <div className='person-experience-header'>
            <p>ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ</p>
          </div>
          {resume?.experiences?.map((item) => (
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

        <hr />

        <div className='person-experience'>
          <div className='person-experience-header'>
            <p>ᲒᲐᲜᲐᲗᲚᲔᲑᲐ</p>
          </div>
          {resume?.educations?.map((item) => (
            <>
              <div className='person-experience-position'>
                <p className='position'>
                  {item.institute}, {item.degree}{' '}
                </p>
                <p className='dates'>{item.due_date}</p>
              </div>
              <div className='description'>
                <p>{item.description}</p>
              </div>
            </>
          ))}
        </div>
        <img
          style={{ marginTop: '100px' }}
          className='logo-img'
          width='50px'
          height='50px'
          src={logo}
        />
      </div>
    </div>
  )
}

export default ResumeReview
