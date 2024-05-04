import style from './JobCard.module.css'

export const JobCard = () => {
  return (
    <article className={style.JobCard}>

      <header className={style.JobCard__Header}>
        <div className={style.JobCard__HeaderRow}>
          <div>
            <img style={{ backgroundColor: 'red', height: 30, width: 30 }} src="https://www.famapp.in/assets/localImages/fampayLogo.png" alt="company-img" />
          </div>

          <div className={style.JobCard__HeaderInfo}>
            <h1 className={style.JobCard__HeaderInfoCompanyNameText}>fampay</h1>
            <p className={style.JobCard__HeaderInfoRollTypeText}>Backend Engineer</p>
            <p className={style.JobCard__HeaderInfoLocationText}>Banglore</p>
          </div>
        </div>
      </header>

      <section className={style.JobCard__SalaryInfo}>
        <h2 className={style.JobCard__SalaryInfoEstSalaryText}>Estimated Salary: 18 - 35LPA</h2>
      </section>

      <section className={style.JobCard__CompanyInfo}>
        <h2 className={style.JobCard__CompanyInfoAboutCompanyText}>About Company</h2>
        <p className={style.JobCard__CompanyInfoAboutUsText}>About us</p>
        <p className={style.JobCard__CompanyInfoDescriptionText}>
          Tempor exercitation culpa veniam minim nisi mollit commodo nulla id
          laboris nostrud. Culpa proident ex enim culpa incididunt id ipsum
          adipisicing dolore culpa magna incididunt duis. Laborum ea dolor
          deserunt laborum. Consectetur eu cillum id duis ipsum cupidatat
          veniam. Est labore consectetur adipisicing excepteur est. Esse culpa
          aliquip officia ea labore adipisicing cupidatat occaecat excepteur
          irure consequat sunt amet. Sunt nostrud eu mollit in tempor.
        </p>
      </section>

      <footer className={style.JobCard__Footer}>
        <h2 className={style.JobCard__FooterMinExpText}>Minimum Experience</h2>
        <p className={style.JobCard__FooterExpCountText}>2 years</p>
      </footer>
    </article>
  );
};
