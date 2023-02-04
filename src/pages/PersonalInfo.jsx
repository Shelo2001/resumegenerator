import React, { useState } from 'react'
import '../global.scss'
import LiveResume from '../components/LiveResume'
import { Link } from 'react-router-dom'
import backarrow from '../assets/backarrow.svg'
import * as yup from 'yup'

const PersonalInfo = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [aboutme, setAboutme] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [image, setImage] = useState(null)
  const person = { name, surname, image, aboutme, email, phoneNumber }

  const submitPersonalInfo = async (e) => {
    e.preventDefault()
    const person = {
      name,
      surname,
      image,
      aboutme,
      email,
      phoneNumber,
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
            <label for='firstName'>სახელი</label>
            <input
              onChange={(e) => setName(e.target.value)}
              placeholder='ანზორ'
              type='text'
              name='firstName'
            />
            <p>მინიმუმ 2 ასო, ქართული ასოები</p>
          </div>
          <div>
            <label for='surname'>გვარი</label>
            <input
              onChange={(e) => setSurname(e.target.value)}
              placeholder='მუმლაძე'
              type='text'
              name='surname'
            />
            <p>მინიმუმ 2 ასო, ქართული ასოები</p>
          </div>
        </div>
        <div className='file-container'>
          <label>პირადი ფოტოს ატვირთვა</label>
          <label className='fileAppearance' for='file'>
            ატვირთვა
          </label>
          <input
            onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
            id='file'
            accept='image/*'
            type='file'
          />
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
          <label for='email'>ელ.ფოსტა</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder='anzor666@redberry.ge'
            type='email'
            name='email'
          />
          <p>უნდა მთავრდებოდეს @redberry.ge-ით</p>
        </div>
        <div>
          <label for='phoneNumber'>მობილურის ნომერი</label>
          <input
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder='+995 551 12 34 56'
            type='text'
            name='phoneNumber'
          />
          <p>უნდა აკმაყოფილებდეს ქართული ნომრის ფორმატს</p>
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
