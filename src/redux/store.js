import { configureStore } from '@reduxjs/toolkit'
import questionsReducer from './questions'

export const store = configureStore({
  reducer: {
    questions: questionsReducer
  },
})