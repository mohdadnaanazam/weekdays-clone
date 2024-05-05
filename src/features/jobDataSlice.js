import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getJob = createAsyncThunk('getJob', async () => {
  const myHeaders = new Headers()

  myHeaders.append("Content-Type", "application/json")

  const body = JSON.stringify({
    "limit": 10,
    "offset": 0
  })

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body
  }

  try {
    const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)

    return response.json()
  } catch (error) {
    console.log(error, 'error')

    return error
  }
})

export const jobDataSlice = createSlice({
  name: 'jobData',
  initialState: {
    jobData: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
    .addCase(getJob.pending, (state) => {
      state.loading = true
    })
    .addCase(getJob.fulfilled, (state, action) => {
      state.jobData = action.payload
      state.loading = false
    })
    .addCase(getJob.rejected, (state, action) => {
      state.error = action.error
      state.loading = false
    })
  }
})

export default jobDataSlice.reducer