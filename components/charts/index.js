import _ from "lodash";
import { SleepStatusBarChart, SleepHypnogramDataNotaAvailable } from "./sleepStats";
import { HeartRateChart, HeartRateChartNotAvailable } from './heartRate';
import { SleepDurationSleepScoreTrend, SleepTrendChart } from './sleepTrends';




export default function SleepStats({ data }) {

  const sleepStatusData = (data) => {
  const sleepStats = []
  if (data) {
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
  
  return (
    <div>
      <div>
          <div><h3>Sleep</h3></div>
          <div><h4>{data && _.last(data).dailyScore}</h4></div>
      </div>
      <hr></hr>
      <br></br>
      <SleepTrendChart data={data} formatDate={formatDate} />
      <hr></hr>
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