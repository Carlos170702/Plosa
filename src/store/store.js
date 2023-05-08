import { configureStore } from '@reduxjs/toolkit'
import { records } from './recods/recordsSlices'

export const store = configureStore({
  reducer: {
    records: records.reducer
  },
})