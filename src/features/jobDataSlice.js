import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getJob = createAsyncThunk('getJob', async (offset = 10) => {
  const myHeaders = new Headers()

  myHeaders.append("Content-Type", "application/json")

  const body = JSON.stringify({
    "limit": 10,
    "offset": offset
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
    totalCount: 0,
    loading: true,
    error: null,
    currentOffset: 0,
    nextPageLoading: false
  },
  extraReducers: (builder) => {
    builder
    .addCase(getJob.pending, (state) => {
      state.nextPageLoading = true
      state.loading = state.loading ? state.loading : false
    })
    .addCase(getJob.fulfilled, (state, action) => {
      const prevData = state.jobData || []

      state.jobData = [...prevData, ...action.payload.jdList]
      state.totalCount = action.payload.totalCount
      state.nextPageLoading = false
      state.loading = false
      state.currentOffset = state.currentOffset + 10
    })
    .addCase(getJob.rejected, (state, action) => {
      state.error = action.error
      state.loading = false
      state.nextPageLoading = false
    })
  }
})

export default jobDataSlice.reducer