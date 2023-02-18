import Head from 'next/head';
import { fetchSleepDetails } from '../apis/sleep';
import SleepStats from '../components/charts';
import { PAGE_ENABLED } from '../configs';
import styles from '../styles/Home.module.css';

export async function getServerSideProps(context) {
  if (!PAGE_ENABLED) return {props: { data: null }}
  const accesstoken = context.query.accesstoken
  const results = await fetchSleepDetails(accesstoken)//, '2023-02-07', '2023-02-16')
  .catch(error => {
    console.log({ errroMessage: error.message }, 'Unable to fetch sleep details')
  })
  return { props: { data: results ? results.data : null } }
}

export default function Home({data}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      { PAGE_ENABLED ? (<div className={styles.card}>
            { data ? <SleepStats data={data}/> : <div>Data not available</div> }
        </div>) : ''}
        
      </main>
      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
