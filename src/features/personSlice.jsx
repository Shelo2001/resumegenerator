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

const personSlice = createSlice({
  name: 'person',
  initialState: {
    person_info: {},
    person_experience: [],
    degrees: [],
  },
  reducers: {
    addPersonInfo: (state, { payload }, getState) => {
      console.log(state.person)
      state.person_info = payload
    },
    addPersonExperience: (state, { payload }, getState) => {
      state.person_experience = payload
    },
  },
  extraReducers: {
    [getDegrees.fulfilled]: (state, { payload }) => {
      state.degrees = payload
    },
  },
})
export const personReducer = personSlice.reducer
export const { addPersonInfo, addPersonExperience } = personSlice.actions
