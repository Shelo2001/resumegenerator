import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getDegrees = createAsyncThunk('person/getDegrees', async () => {
  try {
    const { data } = await axios.get(
      'https://resume.redberryinternship.ge/api/degrees'
    )

    return data
  } catch (error) {
    console.log(error)
  }
})

export const storeResume = createAsyncThunk(
  'person/storeResume',
  async (resume) => {
    try {
      const { data } = await axios.post(
        'https://resume.redberryinternship.ge/api/cvs',
        resume,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      return data
    } catch (error) {
      console.log(error)
    }
  }
)

const personSlice = createSlice({
  name: 'person',
  initialState: {
    person_info: {},
    person_experience: [],
    person_education: [],
    degrees: [],
    resume: [],
  },
  reducers: {
    addPersonInfo: (state, { payload }, getState) => {
      state.person_info = payload
      localStorage.setItem('person_info', JSON.stringify(payload))
    },
    addPersonExperience: (state, { payload }, getState) => {
      state.person_experience = payload
      localStorage.setItem('person_experience', JSON.stringify(payload))
    },
    addPersonEducation: (state, { payload }, getState) => {
      state.person_education = payload
      localStorage.setItem('person_education', JSON.stringify(payload))
    },
  },
  extraReducers: {
    [getDegrees.fulfilled]: (state, { payload }) => {
      state.degrees = payload
    },
    [storeResume.fulfilled]: (state, { payload }) => {
      localStorage.setItem('resume_fulfilled', JSON.stringify(payload))
      state.resume = payload
      state.person_info = {}
      state.person_experience = []
      state.degrees = []
      window.location.href = '/resume/overview'
    },
  },
})
export const personReducer = personSlice.reducer
export const { addPersonInfo, addPersonExperience, addPersonEducation } =
  personSlice.actions
