import { getJob } from './features/jobDataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import classNames from 'classnames'

import './styles/globals.css'
import { FilterInput } from './components/FilterInput'
import { JobCard } from './components/JobCard'
import style from './App.module.css'
import { Loader } from './components/Loader'


const RenderJobs = (props) => {
  const { jobData, isLoading } = props

  const { filters } = jobData

  if (isLoading) {
    return (
      <section className={style['Home__CardsContainer--Loading']}>
        <Loader />
      </section>
    )
  }

  if (Object.values(filters).length > 0) {
    return (
      <section className={style.Home__CardsContainer}>
        {jobData?.jobWithFilters?.map((job, index) => (
          <JobCard key={job.jdUid} job={job} />
        ))}
      </section>
    )
  }

  return (
    <section className={style.Home__CardsContainer}>
      {jobData?.jobData?.map((job) => (
        <JobCard key={job.jdUid} job={job} />
      ))}
    </section>
  )
}

function App() {
  // init
  const dispatch = useDispatch()
  const jobData = useSelector(state => state.app)
  const offset = jobData.currentOffset
  const totalCount = jobData.totalCount
  const nextPageLoading = jobData.nextPageLoading
  const initialLoading = jobData.loading

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
  }, [])

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.innerHeight + window.scrollY;
      const scrollHeight = document.body.scrollHeight;

      if (scrollTop >= scrollHeight && !nextPageLoading ) {
        handleFetchNextPage()
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [jobData.loading, nextPageLoading])


  /**
   * @description Fetches the next page of jobs
   * @returns {void}
   */
  const handleFetchNextPage = () => {
    if (!jobData.loading && !nextPageLoading && jobData.jobData.length < totalCount) {
      dispatch(getJob(offset + 10))
    }
  }

  return (
    <div className={style.Home}>
      <FilterInput />

      <RenderJobs jobData={jobData} isLoading={jobData.loading} />

      <section className={classNames(nextPageLoading && !initialLoading ? style.Home__Footer : style['Home__Footer--Hidden'])}>
        <Loader />
      </section>
    </div>
  );
}


export default App
