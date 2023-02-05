import { createSlice } from '@reduxjs/toolkit'

const personSlice = createSlice({
  name: 'person',
  initialState: {
    person_info: {},
    person_experience: [],
  },
  reducers: {
    addPersonInfo: (state, action, getState) => {
      console.log(action.payload.image)
      state.person_info = action.payload
    },
    addPersonExperience: (state, action, getState) => {
      console.log(action.payload.image)
      state.person_experience = action.payload
    },
  },
})
export const personReducer = personSlice.reducer
export const { addPersonInfo, addPersonExperience } = personSlice.actions
