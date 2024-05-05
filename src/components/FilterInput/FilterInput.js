import { Autocomplete, TextField } from '@mui/material'
import style from './FilterInput.module.css';

export const FilterInput = () => {
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
  { title: 'Backend Developer', group: 'Development' },
  { title: 'Product Manager', group: 'Management' },
  { title: 'Frontend Developer', group: 'Development' },
  { title: 'Data Scientist', group: 'Data' },
  { title: 'UI/UX Designer', group: 'Design' },
  { title: 'Software Engineer', group: 'Development' },
  { title: 'Database Administrator', group: 'Data' },
  { title: 'Project Manager', group: 'Management' },
  { title: 'Systems Analyst', group: 'Development' },
  { title: 'Full Stack Developer', group: 'Development' },
  { title: 'Technical Lead', group: 'Management' },
  { title: 'Scrum Master', group: 'Management' },
  { title: 'Quality Assurance Engineer', group: 'Testing' },
  { title: 'DevOps Engineer', group: 'Development' },
  { title: 'Data Engineer', group: 'Data' },
  { title: 'Machine Learning Engineer', group: 'Data' },
  { title: 'Cybersecurity Analyst', group: 'Security' },
  { title: 'Cloud Architect', group: 'Infrastructure' },
  { title: 'Network Engineer', group: 'Infrastructure' },
  { title: 'Business Analyst', group: 'Management' },
  { title: 'UI Designer', group: 'Design' },
  { title: 'Backend Engineer', group: 'Development' },
  { title: 'Frontend Engineer', group: 'Development' },
  { title: 'Product Owner', group: 'Management' },
  { title: 'Software Architect', group: 'Development' },
  { title: 'Technical Writer', group: 'Documentation' },
  { title: 'System Administrator', group: 'Infrastructure' },
  { title: 'UX Designer', group: 'Design' },
  { title: 'QA Engineer', group: 'Testing' },
  { title: 'Web Developer', group: 'Development' },
  { title: 'IT Manager', group: 'Management' },
  { title: 'Database Developer', group: 'Data' },
  { title: 'Technical Consultant', group: 'Consulting' },
  { title: 'IT Specialist', group: 'Infrastructure' },
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
  '10L',
  '20L',
  '30L',
  '40L',
  '50L',
  '60L',
  '70L',
  '80L',
]

const employees = [
  '1-10',
  '21-50',
  '51-100',
  '101-200',
  '500+'
]
