import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter'
import { Button } from '../Button';
import style from './JobCard.module.css'

export const RenderMinExp = (props) => {
  const { minExp } = props

  if (!minExp) {
    return (
      <div style={{ flex: 1 }} />
    )
  }

  return (
    <>
      <h2 className={style.JobCard__FooterMinExpText}>{minExp ? 'Minimum Experience' : ''}</h2>
      <p className={style.JobCard__FooterExpCountText}>{minExp ? `${minExp} years` : ''}</p>
    </>
  )
}

export const JobCard = (props) => {
  // init
  const { job } = props

  const { logoUrl, companyName, location, jobDetailsFromCompany, jobRole, maxJdSalary, minJdSalary, salaryCurrencyCode, minExp } = job

  /**
   * @description Renders estimated salary
   * @returns {string}
   */
  const renderEstSalary = () => {
    if (minJdSalary && maxJdSalary) {
      return `${minJdSalary} - ${maxJdSalary}${salaryCurrencyCode}`
    } else if (minJdSalary) {
      return `${minJdSalary}${salaryCurrencyCode}`
    } else if (maxJdSalary) {
      return `${maxJdSalary}${salaryCurrencyCode}`
    }
  }

  return (
    <article className={style.JobCard}>
      <header className={style.JobCard__Header}>
        <div className={style.JobCard__HeaderRow}>
          <img className={style.JobCard__HeaderRowImg} src={logoUrl} alt="company-img" />

          <div className={style.JobCard__HeaderInfo}>
            <h1 className={style.JobCard__HeaderInfoCompanyNameText}>{companyName}</h1>
            <p className={style.JobCard__HeaderInfoRollTypeText}>{capitalizeFirstLetter(jobRole)}</p>
            <p className={style.JobCard__HeaderInfoLocationText}>{capitalizeFirstLetter(location)}</p>
          </div>
        </div>
      </header>

      <section className={style.JobCard__SalaryInfo}>
        <h2 className={style.JobCard__SalaryInfoEstSalaryText}>Estimated Salary: {renderEstSalary()}</h2>
      </section>

      <section className={style.JobCard__CompanyInfo}>
        <h2 className={style.JobCard__CompanyInfoAboutCompanyText}>About Company</h2>
        <p className={style.JobCard__CompanyInfoAboutUsText}>About us</p>
        <p className={style.JobCard__CompanyInfoDescriptionText}>
          {jobDetailsFromCompany}
        </p>
      </section>

      <div className={style.JobCard__ViewJobButton}>
        <p className={style.JobCard__ViewJobText}>View Job</p>
      </div>

      <footer className={style.JobCard__Footer}>
        <RenderMinExp minExp={minExp} />

        <Button />
      </footer>

    </article>
  )
}
