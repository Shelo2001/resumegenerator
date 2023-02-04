import { createSlice } from '@reduxjs/toolkit'

const personSlice = createSlice({
  name: 'person',
  initialState: {
    person_info: {},
  },
  reducers: {
    addPersonInfo: (state, action, getState) => {
      console.log(action.payload.image)
      state.person_info = action.payload
    },
  },
})
export const personReducer = personSlice.reducer
export const { addPersonInfo } = personSlice.actions
