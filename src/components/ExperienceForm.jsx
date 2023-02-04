import React from 'react'
import { Link } from 'react-router-dom'

const ExperienceForm = () => {
  return (
    <div>
      <div>
        <label for='position' className='labelerror'>
          თანამდებობა
        </label>
        <input placeholder='ანზორ' type='text' name='position' />
        <p>მინიმუმ 2 სიმბოლო</p>
      </div>
      <div>
        <label for='employer' className='labelerror'>
          დამსაქმებელი
        </label>
        <input placeholder='ანზორ' type='text' name='employer' />
        <p>მინიმუმ 2 სიმბოლო</p>
      </div>
      <div className='date-container'>
        <div>
          <label for='startdate'>დაწყების რიცხვი</label>
          <input type='date' name='startdate' />
        </div>
        <div>
          <label for='enddate'>დამთავრების რიცხვი</label>
          <input name='enddate' type='date' />
        </div>
      </div>
      <div>
        <label for='aboutme'>აღწერა</label>
        <textarea placeholder='ზოგადი ინფო შენ შესახებ' name='aboutme' />
      </div>
      <hr style={{ width: '100%', marginTop: '50px' }} />
    </div>
  )
}

export default ExperienceForm
