/* eslint-disable react-hooks/exhaustive-deps */
import { Autocomplete, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './FilterInput.module.css';
import { jobFilter, filterJobs } from '../../features/jobDataSlice';

export const FilterInput = () => {
  // init
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const applyJobs = useSelector((state) => state.app)

  // update the URL whenever filters change
  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.append('filters', JSON.stringify(applyJobs?.filters));

    navigate(`?${searchParams.toString()}`);
  }, [applyJobs.filters, navigate])

  // filter jobs whenever filters change
  useEffect(() => {
    if (Object.values(applyJobs.filters).length > 0) {
      dispatch(filterJobs())
    }
  }, [applyJobs.filters])


  /**
   * @description Updates the filters
   * @param {string} key
   * @param {string | string[]} value
   */
  const handleUpdateFilters = (key, value) => {
    const updatedFilters = {
      ...applyJobs.filters,
      [key]: value
    }

    if (Array.isArray(value) && value?.length === 0) {
      delete updatedFilters[key];
    }

    dispatch(jobFilter(updatedFilters));
  }

  const options = roles.map((option) => {
    const group = option.group
    return {
      groupBy: group,
      ...option,
    }
  })

  return (
    <div className={style.FilterInput}>
      <div className={style.FilterInput__AutoComplete}>
        <Autocomplete
          id="roles"
          options={options}
          groupBy={(option) => option.groupBy}
          getOptionLabel={(option) => option.title}
          multiple
          onChange={(e, item) => handleUpdateFilters('roles', item.map((i) => i.value))}
          sx={{ minWidth: 250 }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Role"
              InputLabelProps={{ shrink: false }}
            />
          )}
        />
      </div>

      <div className={style.FilterInput__AutoComplete}>
        <Autocomplete
          id="employees"
          options={employees}
          sx={{ minWidth: 200 }}
          multiple
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="No. Of Employees"
              InputLabelProps={{ shrink: false }}
            />
          )}
        />
      </div>

      <div className={style.FilterInput__AutoComplete}>
        <Autocomplete
          id="experience"
          options={experience}
          sx={{ width: 150, fontSize: '18px' }}
          onChange={(e, item) => handleUpdateFilters('experience', item)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Experience"
              InputLabelProps={{ shrink: false }}
              sx={{ fontSize: '18px' }}
            />
          )}
        />
      </div>

      <div className={style.FilterInput__AutoComplete}>
        <Autocomplete
          id="remote"
          options={['Remote', 'In-Office', 'Hybrid']}
          sx={{ minWidth: 100 }}
          multiple
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Remote"
              InputLabelProps={{ shrink: false }}
            />
          )}
        />
      </div>

      <div className={style.FilterInput__AutoComplete}>
        <Autocomplete
          id="roles"
          options={pay}
          sx={{ width: 150 }}
          onChange={(e, item) => handleUpdateFilters('pay', item?.value)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Min Base Pay"
              InputLabelProps={{ shrink: false }}
              sx={{ fontSize: '15px' }}
            />
          )}
        />
      </div>

      <div className={style.FilterInput__TextField}>
        <TextField
          placeholder='Search Company Name'
          size='small'
        />
      </div>
    </div>
  )
}

const roles = [
  { title: 'Backend Developer', group: 'Development', value: 'backend' },
  { title: 'Product Manager', group: 'Management', value: 'product manager' },
  { title: 'Frontend Developer', group: 'Development', value: 'frontend' },
  { title: 'Data Scientist', group: 'Data', value: 'data scientist' },
  { title: 'UI/UX Designer', group: 'Design', value: 'ui/ux designer' },
  { title: 'Software Engineer', group: 'Development', value: 'software engineer' },
  { title: 'Database Administrator', group: 'Data', value: 'database administrator' },
  { title: 'Project Manager', group: 'Management', value: 'project manager' },
  { title: 'Systems Analyst', group: 'Development', value: 'systems analyst' },
  { title: 'Full Stack Developer', group: 'Development', value: 'full stack developer' },
  { title: 'Technical Lead', group: 'Management', value: 'technical lead' },
  { title: 'Scrum Master', group: 'Management', value: 'scrum master' },
  { title: 'Quality Assurance Engineer', group: 'Testing', values: 'quality assurance engineer' },
  { title: 'DevOps Engineer', group: 'Development', value: 'devops engineer' },
  { title: 'Data Engineer', group: 'Data', value: 'data engineer' },
  { title: 'Machine Learning Engineer', group: 'Data', value: 'machine learning engineer' },
  { title: 'Cybersecurity Analyst', group: 'Security', value: 'cybersecurity analyst' },
  { title: 'Cloud Architect', group: 'Infrastructure', value: 'cloud architect' },
  { title: 'Network Engineer', group: 'Infrastructure', value: 'network engineer' },
  { title: 'Business Analyst', group: 'Management', value: 'business analyst' },
  { title: 'UI Designer', group: 'Design', value: 'ui designer' },
  { title: 'Backend Engineer', group: 'Development', value: 'backend engineer' },
  { title: 'Frontend Engineer', group: 'Development', value: 'frontend engineer' },
  { title: 'Product Owner', group: 'Management', value: 'product owner' },
  { title: 'Software Architect', group: 'Development', value: 'software architect' },
  { title: 'Technical Writer', group: 'Documentation', value: 'technical writer' },
  { title: 'System Administrator', group: 'Infrastructure', value: 'system administrator' },
  { title: 'UX Designer', group: 'Design', value: 'ux designer' },
  { title: 'QA Engineer', group: 'Testing', value: 'qa engineer' },
  { title: 'Web Developer', group: 'Development', value: 'web developer' },
  { title: 'IT Manager', group: 'Management', value: 'it manager' },
  { title: 'Database Developer', group: 'Data', value: 'database developer' },
  { title: 'Technical Consultant', group: 'Consulting', value: 'technical consultant' },
  { title: 'IT Specialist', group: 'Infrastructure', value: 'it specialist' },
]

const experience = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
]

const pay = [
  { label: '20L', value: 20 },
  { label: '30L', value: 30 },
  { label: '40L', value: 40 },
  { label: '50L', value: 50 },
  { label: '60L', value: 60 },
  { label: '70L', value: 70 },
  { label: '80L', value: 80 },
]

const employees = [
  '1-10',
  '21-50',
  '51-100',
  '101-200',
  '500+'
]
