import React, { useEffect, useState } from 'react'
import '../global.scss'
import LiveResume from '../components/LiveResume'
import { Link, useNavigate } from 'react-router-dom'
import backarrow from '../assets/backarrow.svg'
import errorsvg from '../assets/Vector (1).svg'
import successsvg from '../assets/Vector.svg'
import {
  emailValidation,
  nameAndSurnameValidation,
  phoneValidation,
} from '../Validations'

const PersonalInfo = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [aboutme, setAboutme] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [image, setImage] = useState(null)
  const [nameError, setNameError] = useState('')
  const [surnameError, setSurnameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneNumberError, setPhoneNumberError] = useState('')
  const person = { name, surname, image, aboutme, email, phoneNumber }

  useEffect(() => {
    setNameError(nameAndSurnameValidation(name))
    setSurnameError(nameAndSurnameValidation(surname))
    setEmailError(emailValidation(email))
    setPhoneNumberError(phoneValidation(phoneNumber))
  }, [name, surname, email, phoneNumber])

  const submitPersonalInfo = async (e) => {
    e.preventDefault()

    if (name && surname && email && phoneNumber && image) {
      navigate('/resume/2')
    }
  }

  return (
    <div className='personal-info-wrapper'>
      <div className='personal-info-container'>
        <Link to='/'>
          <button className='back-button'>
            <img src={backarrow} />
          </button>
        </Link>

        <div className='navbar-container'>
          <h2>პირადი ინფო</h2>
          <h2>1/3</h2>
        </div>
      </div>
      <div className='form-container'>
        <div className='name-container'>
          <div>
            {nameError ? (
              <>
                <label for='firstName' className='labelerror'>
                  სახელი
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  placeholder='ანზორ'
                  type='text'
                  name='firstName'
                  className={nameError ? 'error' : ''}
                />
                <span>
                  <img src={errorsvg} />
                </span>
                <p>{nameError}</p>
              </>
            ) : (
              <>
                <label for='firstName'>სახელი</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  placeholder='ანზორ'
                  type='text'
                  name='firstName'
                  className={
                    nameError ? 'error' : name.length == 0 ? '' : 'success'
                  }
                />
                {name.length !== 0 && (
                  <span>
                    <img src={successsvg} />
                  </span>
                )}
                <p>მინიმუმ 2 ასო, ქართული ასოები</p>
              </>
            )}
          </div>
          <div>
            {surnameError ? (
              <>
                <label className='labelerror' for='surname'>
                  გვარი
                </label>
                <input
                  onChange={(e) => setSurname(e.target.value)}
                  placeholder='მუმლაძე'
                  type='text'
                  name='surname'
                  className={surnameError ? 'error' : ''}
                />
                <span>
                  <img src={errorsvg} />
                </span>
                <p>{surnameError}</p>
              </>
            ) : (
              <>
                <label for='firstName'>გვარი</label>
                <input
                  onChange={(e) => setSurname(e.target.value)}
                  placeholder='ანზორ'
                  type='text'
                  name='firstName'
                  className={
                    surnameError
                      ? 'error'
                      : surname.length == 0
                      ? ''
                      : 'success'
                  }
                />
                {surname.length !== 0 && (
                  <span>
                    <img src={successsvg} />
                  </span>
                )}
                <p>მინიმუმ 2 ასო, ქართული ასოები</p>
              </>
            )}
          </div>
        </div>
        <div className='file-container'>
          <label>პირადი ფოტოს ატვირთვა</label>
          <label className='fileAppearance' for='file'>
            ატვირთვა
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            id='file'
            accept='image/*'
            type='file'
          />
          {image && (
            <span>
              <img src={successsvg} />
            </span>
          )}
        </div>
        <div className='aboutme'>
          <label for='aboutme'>ჩემ შესახებ (არასავალდებულო)</label>
          <textarea
            onChange={(e) => setAboutme(e.target.value)}
            placeholder='ზოგადი ინფო შენ შესახებ'
            name='aboutme'
          />
        </div>
        <div className='mail-container'>
          {emailError ? (
            <>
              <label className='labelerror' for='email'>
                ელ.ფოსტა
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder='anzor666@redberry.ge'
                type='email'
                name='email'
                className={emailError ? 'error' : ''}
              />
              <span>
                <img src={errorsvg} />
              </span>
              <p>{emailError}</p>
            </>
          ) : (
            <>
              <label for='email'>ელ.ფოსტა</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder='anzor666@redberry.ge'
                type='email'
                name='email'
                className={
                  emailError ? 'error' : email.length == 0 ? '' : 'success'
                }
              />
              {email.length !== 0 && (
                <span>
                  <img src={successsvg} />
                </span>
              )}
              <p>უნდა მთავრდებოდეს @redberry.ge-ით</p>
            </>
          )}
        </div>
        <div className='phone-container'>
          {phoneNumberError ? (
            <>
              <label className='labelerror' for='phoneNumber'>
                მობილურის ნომერი
              </label>
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder='+995 551 12 34 56'
                type='text'
                name='phoneNumber'
                className={phoneNumberError ? 'error' : ''}
              />
              <span>
                <img src={errorsvg} />
              </span>
              <p>{phoneNumberError}</p>
            </>
          ) : (
            <>
              <label for='phoneNumber'>მობილურის ნომერი</label>
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder='+995 551 12 34 56'
                type='text'
                name='phoneNumber'
                className={
                  phoneNumberError
                    ? 'error'
                    : phoneNumber.length == 0
                    ? ''
                    : 'success'
                }
              />
              {phoneNumber.length !== 0 && (
                <span>
                  <img src={successsvg} />
                </span>
              )}
              <p>უნდა აკმაყოფილებდეს ქართული ნომრის ფორმატს</p>
            </>
          )}
        </div>
        <button onClick={submitPersonalInfo} className='purple-button'>
          შემდეგი
        </button>
      </div>
      <LiveResume person={person} />
    </div>
  )
}

export default PersonalInfo
