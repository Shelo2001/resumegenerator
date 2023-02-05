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
import { useDispatch } from 'react-redux'
import { addPersonInfo } from '../features/personSlice'

const PersonalInfo = () => {
  const navigate = useNavigate()
  const [name, setName] = useState(localStorage.getItem('name') || '')
  const [surname, setSurname] = useState(localStorage.getItem('surname') || '')
  const [aboutme, setAboutme] = useState(localStorage.getItem('aboutme') || '')
  const [email, setEmail] = useState(localStorage.getItem('email') || '')
  const [phoneNumber, setPhoneNumber] = useState(
    localStorage.getItem('phoneNumber') || ''
  )
  const [image, setImage] = useState(null)
  const [personImage, setPersonImage] = useState(null)
  const [nameError, setNameError] = useState('')
  const [surnameError, setSurnameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneNumberError, setPhoneNumberError] = useState('')
  const person = { name, surname, image, aboutme, email, phoneNumber }
  const dispatch = useDispatch()

  useEffect(() => {
    setNameError(nameAndSurnameValidation(name))
    setSurnameError(nameAndSurnameValidation(surname))
    setEmailError(emailValidation(email))
    setPhoneNumberError(phoneValidation(phoneNumber))
  }, [name, surname, email, phoneNumber])

  function getBase64(file) {
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      setPersonImage(reader.result)
    }
  }

  if (image) {
    getBase64(image)
  }

  const submitPersonalInfo = async (e) => {
    e.preventDefault()
    if (name && surname && email && phoneNumber && image) {
      let personInfo = { ...person, image: personImage }
      dispatch(addPersonInfo(personInfo))
      navigate('/resume/2')
    }
  }

  return (
    <div className='personal-info-wrapper'>
      <div className='personal-info-container'>
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
                  onKeyUp={(e) => localStorage.setItem('name', e.target.value)}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='ანზორ'
                  type='text'
                  value={name}
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
                  onKeyUp={(e) => localStorage.setItem('name', e.target.value)}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='ანზორ'
                  value={name}
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
                  onKeyUp={(e) =>
                    localStorage.setItem('surname', e.target.value)
                  }
                  onChange={(e) => setSurname(e.target.value)}
                  placeholder='მუმლაძე'
                  type='text'
                  value={surname}
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
                  onKeyUp={(e) =>
                    localStorage.setItem('surname', e.target.value)
                  }
                  value={surname}
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
            onKeyUp={(e) => localStorage.setItem('aboutme', e.target.value)}
            value={aboutme}
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
                onKeyUp={(e) => localStorage.setItem('email', e.target.value)}
                type='email'
                value={email}
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
                onKeyUp={(e) => localStorage.setItem('email', e.target.value)}
                value={email}
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
                onKeyUp={(e) =>
                  localStorage.setItem('phoneNumber', e.target.value)
                }
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder='+995 551 12 34 56'
                type='text'
                value={phoneNumber}
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
                onKeyUp={(e) =>
                  localStorage.setItem('phoneNumber', e.target.value)
                }
                value={phoneNumber}
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
