import _ from "lodash";
import { SleepStatusBarChart, SleepHypnogramDataNotaAvailable } from "./sleepStats";
import { HeartRateChart, HeartRateChartNotAvailable } from './heartRate';
import { SleepDurationSleepScoreTrend, SleepTrendChart } from './sleepTrends';
import { useState } from "react";




export default function SleepStats({ data }) {
  // console.log(data)
  const [ sleepDetailsData, setSleepDetailsData ] = useState(_.last(data));
  const [ sleepDetailsDataIndex, setSleepDetailsDataIndex ] = useState(data.length ? data.length - 1 : 0);
  
  const previousSleepDataDetails = () => {
    if (sleepDetailsDataIndex > 0) {
      setSleepDetailsData(data[sleepDetailsDataIndex - 1])
      setSleepDetailsDataIndex(sleepDetailsDataIndex - 1)
      // console.log('previous day', sleepDetailsDataIndex, data[sleepDetailsDataIndex - 1])
    }
  }

  const nextSleepDataDetails = () => {
    if (sleepDetailsDataIndex < data.length - 1) {
      setSleepDetailsData(data[sleepDetailsDataIndex + 1])
      setSleepDetailsDataIndex(sleepDetailsDataIndex + 1)
      // console.log('next day', sleepDetailsDataIndex, data[sleepDetailsDataIndex + 1])
    }
  }

  const sleepStatusData = (sleepData) => {
  const sleepStats = []
  if (data) {
    const dataItems = _.pick(sleepData, ['awake_duration_sec', 'light_duration_sec', 'deep_duration_sec', 'rem_duration_sec', 'total_duration_sec'])
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
    // console.log(sleepStats)
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
      <h4>Latest Sleep Stats {sleepDetailsData.endTimeDate}</h4>
      <button disabled={sleepDetailsDataIndex <= 0} onClick={previousSleepDataDetails}>prev</button>
      <button disabled={sleepDetailsDataIndex >= data.length -1} onClick={nextSleepDataDetails}>next</button>
      {data && sleepDetailsData.heartRateData ?
      <HeartRateChart data={sleepDetailsData.heartRateData} formatTime={formatTime}/> : ''}
      <hr></hr>
      <br></br>
      {data && sleepDetailsData.hypnogram_reading > 2 ?
      <SleepStatusBarChart data={data && sleepStatusData(sleepDetailsData)} secToTime={secToTime}/> : <SleepHypnogramDataNotaAvailable/>}
      <hr></hr>
      <br/>
      Sleep Duration: {data && secToTime(sleepDetailsData.durationAsleepState)}<br/>
      Asleep/In Bed: {data && Math.round(100 * sleepDetailsData.durationAsleepState / sleepDetailsData.durationInBed) || 100}%<br/>
      WakeUps: {data && sleepDetailsData.disturbance}<br/>
      Min Heart Rate: {data && sleepDetailsData.min_heart_rate_reading}<br/>
    </div>
  )
}