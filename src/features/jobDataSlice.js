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
    nextPageLoading: false,
    filters: {},
    jobWithFilters: []
  },
  reducers: {
    jobFilter: (state, action) => {
      state.filters = action.payload
    },

    filterJobs: (state, action) => {
      const { roles, experience, pay, jobType, companyName } = state.filters

      // initialize filteredJobs with all jobs
      let filteredJobs = state.jobData;

      // apply role filter
      if (roles?.length > 0) {
        filteredJobs = filteredJobs.filter(job => roles.includes(job.jobRole));
      }

      // apply experience filter
      if (experience?.length > 0) {
        filteredJobs = filteredJobs.filter(job => job.minExp <= experience);
      }

      // apply pay filter
      if (pay !== null && pay !== undefined) {
        filteredJobs = filteredJobs.filter(job => job.minJdSalary <= pay);
      }

      // apply jobType filter
      if (jobType?.length > 0) {
        filteredJobs = filteredJobs.filter(job => {
          if (jobType.includes('office')) {
            return job.location !== 'remote' && job.location !== 'hybrid'
          } else if (jobType.includes('remote')) {
            return job.location === 'remote'
          } else {
            return job.location === 'hybrid'
          }
        })
      }

      if (companyName?.length > 0) {
        filteredJobs = filteredJobs.filter(job => job.companyName.toLowerCase().includes(companyName))
      }

      state.jobWithFilters = filteredJobs
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJob.pending, (state) => {
        state.nextPageLoading = true
        state.loading = state.loading ? state.loading : false
      })
      .addCase(getJob.fulfilled, (state, action) => {
        const prevData = state.jobData || []
        const hasFilters = Object.keys(state.filters)

        state.jobData = [...prevData, ...action.payload.jdList]

        if (hasFilters) {
          const { roles, experience, pay, jobType, companyName } = state.filters

          // initialize filteredJobs with all jobs
          let filteredJobs = state.jobData;

          // apply role filter
          if (roles?.length > 0) {
            filteredJobs = filteredJobs.filter(job => roles.includes(job.jobRole));
          }

          // apply experience filter
          if (experience?.length > 0) {
            filteredJobs = filteredJobs.filter(job => job.minExp <= experience);
          }

          // apply pay filter
          if (pay !== null && pay !== undefined) {
            filteredJobs = filteredJobs.filter(job => job.minJdSalary <= pay);
          }

          // apply jobType filter
          if (jobType?.length > 0) {
            filteredJobs = filteredJobs.filter(job => {
              if (jobType.includes('office')) {
                return job.location !== 'remote' && job.location !== 'hybrid'
              } else if (jobType.includes('remote')) {
                return job.location === 'remote'
              } else {
                return job.location === 'hybrid'
              }
            })
          }

          if (companyName?.length > 0) {
            filteredJobs = filteredJobs.filter(job => job.companyName.toLowerCase().includes(companyName))
          }

          state.jobWithFilters = filteredJobs
        }

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

export const { jobFilter, filterJobs } = jobDataSlice.actions

export default jobDataSlice.reducer