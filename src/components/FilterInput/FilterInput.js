import { Autocomplete, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './FilterInput.module.css';
import { jobFilter, filterJobs } from '../../features/jobDataSlice';
import { experience, pay, roles } from '../../constants/jobFilters';
import { useDebounce } from '../../hooks/useDebounce';

export const FilterInput = () => {
  // init
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const applyJobs = useSelector((state) => state.app)

  // state
  const [searchTerm, setSearchTerm] = useState('')

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

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
  }, [applyJobs.filters, dispatch])

  // update the company name filter
  useEffect(() => {
    handleUpdateFilters('companyName', debouncedSearchTerm)
  }, [debouncedSearchTerm])


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

    if ((Array.isArray(value) && value?.length === 0) || !value) {
      delete updatedFilters[key]
    }

    dispatch(jobFilter(updatedFilters))
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
          id="jobType"
          options={[{ label: 'Remote', value: 'remote' }, { label: 'In-Office', value: 'office' }, { label: 'Hybrid', value: 'hybrid' }]}
          sx={{ minWidth: 100 }}
          multiple
          onChange={(e, item) => handleUpdateFilters('jobType', item.map((i) => i.value))}
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
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  )
}
