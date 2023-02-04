import { configureStore } from '@reduxjs/toolkit'
import { personReducer } from './features/personSlice'

export default configureStore({
  reducer: {
    person: personReducer,
  },
})
