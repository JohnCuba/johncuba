import type { NextPage } from 'next'
import styles from '@styles/pages/index.module.css'
import data from '@data/main.json'

const Home: NextPage = () => {
  return (
    <main className={styles['root']}>
      <h1 className={styles['name-heading']}>{data.title}</h1>
      <div className={styles['soc']}>
        {data.soc.map(({title, link}, index) => (
          <a
            key={index}
            className={styles['soc-item']}
            target="_blank"
            rel="noreferrer noopener"
            href={link}
          >
            {title}
          </a>
        ))}
      </div>
    </main>
  )
}

export default Home
