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
  const [about_me, setAbout_me] = useState(
    localStorage.getItem('about_me') || ''
  )
  const [email, setEmail] = useState(localStorage.getItem('email') || '')
  const [phone_number, setPhone_number] = useState(
    localStorage.getItem('phone_number') || ''
  )
  const [image, setImage] = useState(null)
  const [personImage, setPersonImage] = useState(null)
  const [nameError, setNameError] = useState('')
  const [surnameError, setSurnameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phone_numberError, setPhone_numberError] = useState('')
  const person = { name, surname, image, about_me, email, phone_number }
  const dispatch = useDispatch()

  useEffect(() => {
    setNameError(nameAndSurnameValidation(name))
    setSurnameError(nameAndSurnameValidation(surname))
    setEmailError(emailValidation(email))
    setPhone_numberError(phoneValidation(phone_number.replace(/ /g, '')))
  }, [name, surname, email, phone_number])

  function getBase64(file) {
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      setPersonImage(reader.result)
    }
  }

  if (image) {
    getBase64(image)
    localStorage.setItem('image', image)
  }

  const submitPersonalInfo = async (e) => {
    e.preventDefault()
    if (
      name &&
      surname &&
      email &&
      phone_number &&
      image &&
      nameError.length < 1 &&
      surnameError < 1 &&
      emailError.length < 1 &&
      phone_numberError < 1
    ) {
      let personInfo = { ...person, image: personImage }
      dispatch(addPersonInfo(personInfo))
      navigate('/resume/2')
    }
  }

  const phone_numberChange = (e) => {
    if (e.target.value.length > 0) {
      if (
        (e.target.value.length == 4 && e.keyCode !== 8) ||
        (e.target.value.length == 8 && e.keyCode !== 8) ||
        (e.target.value.length == 11 && e.keyCode !== 8) ||
        (e.target.value.length == 14 && e.keyCode !== 8)
      ) {
        setPhone_number(e.target.value + ' ')
      }
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
        <div className='about_me'>
          <label for='about_me'>ჩემ შესახებ (არასავალდებულო)</label>
          <textarea
            onChange={(e) => setAbout_me(e.target.value)}
            onKeyUp={(e) => localStorage.setItem('about_me', e.target.value)}
            value={about_me}
            placeholder='ზოგადი ინფო შენ შესახებ'
            name='about_me'
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
          {phone_numberError ? (
            <>
              <label className='labelerror' for='phone_number'>
                მობილურის ნომერი
              </label>
              <input
                onKeyUp={(e) =>
                  localStorage.setItem('phone_number', e.target.value)
                }
                onChange={(e) => setPhone_number(e.target.value)}
                placeholder='+995 551 12 34 56'
                type='text'
                onKeyDown={phone_numberChange}
                value={phone_number}
                name='phone_number'
                className={phone_numberError ? 'error' : ''}
              />
              <span>
                <img src={errorsvg} />
              </span>
              <p>{phone_numberError}</p>
            </>
          ) : (
            <>
              <label for='phone_number'>მობილურის ნომერი</label>
              <input
                onKeyUp={(e) =>
                  localStorage.setItem('phone_number', e.target.value)
                }
                value={phone_number}
                onKeyDown={phone_numberChange}
                onChange={(e) => setPhone_number(e.target.value)}
                placeholder='+995 551 12 34 56'
                type='text'
                name='phone_number'
                className={
                  phone_numberError
                    ? 'error'
                    : phone_number.length == 0
                    ? ''
                    : 'success'
                }
              />
              {phone_number.length !== 0 && (
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
