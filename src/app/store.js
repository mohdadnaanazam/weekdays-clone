import { configureStore } from '@reduxjs/toolkit'
import job from '../features/jobDataSlice'


export const store = configureStore({
  reducer: {
    app: job
  },
})