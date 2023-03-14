import _ from "lodash";
import { SleepStatusBarChart, SleepHypnogramDataNotaAvailable } from "./sleepStats";
import { HeartRateChart, HeartRateChartNotAvailable } from './heartRate';
import { SleepDurationSleepScoreTrend, SleepTrendChart } from './sleepTrends';
import styles from '../../styles/Home.module.css';




export default function SleepStats({ data }) {

  const sleepStatusData = (data) => {
  const sleepStats = []
  if (data) {
    console.log("DATA BEING PRINTED");
    console.log(data);
    const dataItems = _.pick(_.last(data), ['awake_duration_sec', 'light_duration_sec', 'deep_duration_sec', 'rem_duration_sec', 'total_duration_sec'])
    if(dataItems.awake_duration_sec) sleepStats.push({
      name: 'Awake',
      sec: dataItems.awake_duration_sec,
      label: secToTime(dataItems.awake_duration_sec),
      fill: '#D6EFED'
    })

    if(dataItems.light_duration_sec) sleepStats.push({
      name: 'Light',
      sec: dataItems.light_duration_sec,
      label: secToTime(dataItems.light_duration_sec),
      fill: '#B7D3DF'
    })

    if(dataItems.deep_duration_sec) sleepStats.push({
        name: 'Deep',
        sec: dataItems.deep_duration_sec,
        label: secToTime(dataItems.deep_duration_sec),
        fill: '#898AA6'
    })

    if(dataItems.rem_duration_sec) sleepStats.push({
      name: 'REM',
      sec: dataItems.rem_duration_sec,
      label: secToTime(dataItems.rem_duration_sec),
      fill: '#C9BBCF'

    })
    console.log(sleepStats)
    // if(dataItems.total_duration_sec) sleepStats.push({
    //   name: 'Total',
    //   sec: dataItems.total_duration_sec,
    //   label: toTime(dataItems.total_duration_sec)
    // })
  }
  return sleepStats
 }


 const formatDate = (value, index) => {
  const dateArr = `${value}`.split('-')
  return `${dateArr[2]}/${dateArr[1]}`
  }

  const formatTime = (value, index) => {
    const timeArr = `${value}`.split(':')
    return `${timeArr[0]}:${timeArr[1]}`
  }

  const secToTime = (seconds) => {
    const totalMin = seconds / 60
    const hours = Math.floor(totalMin / 60)
    const minutes = Math.floor(totalMin % 60)
    console.log(seconds, totalMin)
    return `${hours ? `${hours}hr` : ''} ${minutes ? `${minutes}min`: ''}`
  }

  console.log("DATA BEING PRINTED");
    console.log(data);
  const dailyScore = _.last(data).dailyScore;
  const lastSleepDate = new Date(_.last(data).endTime);
  
  return (
    <div>
      <div className="card container d-flex" style={{ border:0}}>
            <div className="heading-section row p-0 pt-3 pb-3 justify-content-end">
            <div className="text-center p-0" style={{width:72, height:72}}>
              <div className="card p-1 pt-2 pb-2 justify-content-center bioage-card" style={{width:72, height:72}}>
              <h3 className="score">36.1</h3>
              <p className="score-date" style={{margin:0}}>BioAge</p>
              </div>
            </div>
            </div>
              </div>
      <div className="sleep-card card container d-flex">
          <div className="heading-section row p-3">
          
            <div className="col-7"><h3 className="section-heading">Sleep Score</h3></div>
            <div className="col-5 text-end">
              <h4 className="score">{data && dailyScore}</h4>
              <p className="score-date">{data && lastSleepDate.toDateString()}</p>
            </div>
          </div>
      <SleepTrendChart data={data} formatDate={formatDate} />
      </div>
      <SleepDurationSleepScoreTrend data={data} formatDate={formatDate} />
      <hr></hr>
      {data && _.last(data).heartRateData ?
      <HeartRateChart data={_.last(data).heartRateData} formatTime={formatTime}/> : ''}
      <hr></hr>
      <h4>Latest Sleep Stats</h4>
      <br></br>
      {data && _.last(data).hypnogram_reading > 2 ?
      <SleepStatusBarChart data={data && sleepStatusData(data)} secToTime={secToTime}/> : <SleepHypnogramDataNotaAvailable/>}
      <hr></hr>
      <br/>
      Sleep Duration: {data && secToTime(_.last(data).durationAsleepState)}<br/>
      Asleep/In Bed: {data && Math.round(100 * _.last(data).durationAsleepState / _.last(data).durationInBed) || 100}%<br/>
      WakeUps: {data && _.last(data).disturbance}<br/>
      Min Heart Rate: {data && _.last(data).min_heart_rate_reading}<br/>
    </div>
  )
}