import Head from 'next/head';
import { fetchSleepDetails } from '../apis/sleep';
import SleepStats from '../components/charts';
import { PAGE_ENABLED } from '../configs';
import styles from '../styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.css';

export async function getServerSideProps(context) {
  if (!PAGE_ENABLED) return {props: { data: null }}
  const accesstoken = context.query.accesstoken
  const results = await fetchSleepDetails(accesstoken)
  .catch(error => {
    console.log({ errroMessage: error.message }, 'Unable to fetch sleep details')
  })
  return { props: { data: results ? results.data : null } }
}

export default function Home({data}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Beyond Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100;300;400;500;600;700&family=IBM+Plex+Serif:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <main>
      { PAGE_ENABLED ? (<div >
            { data ? <SleepStats data={data}/> : 
            <div>
            <div className="card container d-flex" style={{width:300, border:0}}>
            <div className="heading-section row p-3 justify-content-end">
            <div className="text-center p-0" style={{width:72, height:72}}>
              <div className="card p-1 pt-2 pb-2 justify-content-center bioage-card" style={{width:72, height:72}}>
              <h3 className="score">36.1</h3>
              <p className="score-date" style={{margin:0}}>BioAge</p>
              </div>
            </div>
            </div>
              </div>
              </div> }
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
       h1,h2,h3 {
        font-family: 'IBM Plex Serif';
      }
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        .score {
          font-size: 24px;
          font-weight:800;
          margin:0;
        }
        .score-date {
          font-size: 12px !important;
          color: #888;
        }
        .heading-section
        * {
          box-sizing: border-box;
        }
        .bioage-card {

background: rgba(80, 237, 218, 0.2);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(5px);
-webkit-backdrop-filter: blur(5px);
border: 1px solid rgba(80, 237, 218, 0.3);
        }
        .sleep-card {
          background: rgba(80, 237, 218, 0.2);
          border-radius: 16px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          border: 1px solid rgba(80, 237, 218, 0.3);
        }
        
      `}</style>
    </div>
  )
}
