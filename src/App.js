import { getJob } from './features/jobDataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import './styles/globals.css'
import { FilterInput } from './components/FilterInput'
import { JobCard } from './components/JobCard'
import style from './App.module.css'
import { Loader } from './components/Loader'


const RenderJobs = (props) => {
  const { jobData, isLoading } = props

  if(isLoading) {
    return (
      <section className={style['Home__CardsContainer--Loading']}>
        <Loader />
      </section>
    )
  }

  return (
    <section className={style.Home__CardsContainer}>
      {jobData?.jobData?.jdList?.map((job, index) => (
        <JobCard key={job.jdUid} job={job} />
      ))}
    </section>
  )
}

function App() {
  // init
  const dispatch = useDispatch()
  const jobData = useSelector(state => state.app)

  console.log(jobData, 'jobData')

  /**
   * @description Fetches jobs from the API
   * @returns {void}
   */
  const handleFetchJobs = () => {
    dispatch(getJob())
  }

  // fetch jobs on component mount
  useEffect(() => {
    handleFetchJobs()
  }, [dispatch])

  return (
    <div className={style.Home}>
      <FilterInput />

      <RenderJobs jobData={jobData} isLoading={jobData.loading} />
    </div>
  );
}


export default App
