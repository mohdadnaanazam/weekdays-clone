import { JobCard } from './components/JobCard'
import './styles/globals.css'
import style from './App.module.css'
import { FilterInput } from './components/FilterInput';

function App() {
  return (
    <div className={style.Home}>
      <FilterInput />
      <section className={style.Home__CardsContainer}>
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
      </section>
    </div>
  );
}

export default App;
