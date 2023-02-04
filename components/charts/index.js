import { LineChart, Line, XAxis, YAxis, AreaChart, CartesianGrid, Tooltip, Area, ComposedChart, BarChart, Bar } from 'recharts';
import _ from "lodash";
import SleepStatusBarChart from "./sleepStats";

const formatDate = (value, index) => {
  const dateArr = `${value}`.split('-')
  return `${dateArr[2]}/${dateArr[1]}`
}

const formatTime = (value, index) => {
  const timeArr = `${value}`.split(':')
  return `${timeArr[0]}:${timeArr[1]}`
}

const toTime = (seconds) => {
  var date = new Date(null)
  date.setSeconds(seconds)
  return `${date.getHours()}hr ${date.getMinutes()}m`
}

const HeartRateChart = ({data}) => {
  return (
    <div>
      <h4>Heart Rate</h4>
      <LineChart width={400} height={400} data={data} >
        <Line type="monotone" dataKey="bpm" stroke="#8884d8"/>
        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
        <XAxis dataKey="time" tickFormatter={formatTime} fontSize="10" tickCount={4}/>
        <YAxis dataKey="bpm" domain={['dataMin - 2', 'dataMax + 2']} fontSize="10" tickCount={5}/>
      </LineChart>
    </div>
  )
}

const SleepTrendChart = ({data}) => {
  return (
    // <div>
    //   <h4>Sleep Score Trend</h4>
        <LineChart width={400} height={400} data={data}>
          <Line type="monotone" dataKey="dailyScore" stroke="#8884d8"/>
          <XAxis dataKey="startTimeDate" tickFormatter={formatDate} fontSize="10"/>
          <YAxis domain={['dataMin - 2', 'dataMax + 2']} fontSize="10" />
        </LineChart>
    // </div>
  )
}

const SleepDurationSleepScoreTrend = ({data}) => {
  return (
    <div>
      <p>Sleep Duration vs sleep score</p>
      <ComposedChart  width={400} height={400}  data={data} 
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey="startTimeDate" tickFormatter={formatDate} fontSize="10"/>
        <YAxis fontSize="10" label={false} domain={['dataMin - 5', 'dataMax + 5']}/>
        <defs>
          <linearGradient id="colorDuration" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFD4B2" stopOpacity={0.5}/>
            <stop offset="100%" stopColor="#8884d8" stopOpacity={0.5}/>
          </linearGradient>
        </defs>
        
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area dataKey="sleep_range" stroke="#8884d8" fillOpacity={1} fill="url(#colorDuration)" />
        <Line type="monotone" dataKey="dailyScore" stroke="#65647C" strokeWidth={3}/>
      </ComposedChart>
    </div>
  )
}

export default function SleepStats({ data }) {
  // const [data, setData] = useState(null)
  // console.log('props>>>>>>', props)
 const sleepStatusData = (data) => {
  const sleepStats = []
  if (data) {
    const dataItems = _.pick(_.last(data), ['awake_duration_sec', 'light_duration_sec', 'deep_duration_sec', 'rem_duration_sec', 'total_duration_sec'])
    if(dataItems.awake_duration_sec) sleepStats.push({
      name: 'Awake',
      sec: dataItems.awake_duration_sec,
      label: toTime(dataItems.awake_duration_sec)
    })

    if(dataItems.light_duration_sec) sleepStats.push({
      name: 'Light',
      sec: dataItems.light_duration_sec,
      label: toTime(dataItems.light_duration_sec)
    })

    if(dataItems.deep_duration_sec) sleepStats.push({
        name: 'Deep',
        sec: dataItems.deep_duration_sec,
        label: toTime(dataItems.deep_duration_sec)
    })

    if(dataItems.rem_duration_sec) sleepStats.push({
      name: 'REM',
      sec: dataItems.rem_duration_sec,
      label: toTime(dataItems.rem_duration_sec)
    })

    if(dataItems.total_duration_sec) sleepStats.push({
      name: 'Total',
      sec: dataItems.total_duration_sec,
      label: toTime(dataItems.total_duration_sec)
    })
  }
  console.log('sleep stats dataItems>>>>' , sleepStats)
  return sleepStats
 }

  return (
    <div>
      <div>
          <div><h3>Sleep</h3></div>
          <div><h4>{data && _.last(data).dailyScore}</h4></div>
      </div>
      <hr></hr>
      <br></br>
      <SleepTrendChart data={data}/>
      <hr></hr>
      <SleepDurationSleepScoreTrend data={data}/>
      <hr></hr>
      {data && _.last(data).heartRateData ? <HeartRateChart data={_.last(data).heartRateData}/> : ''}
      <h4>Data for {data && _.last(data).startTimeDate}</h4>
      {data && _.last(data).hypnogram_reading > 2 ? <SleepStatusBarChart data={data && sleepStatusData(data)}/> : ''}
      Asleep/In Bed: {data && Math.round(100 * _.last(data).durationAsleepState / _.last(data).durationInBed) || 100}%
      WakeUps: {data && _.last(data).disturbance}
      Min Heart Rate: {data && _.last(data).min_heart_rate_reading}
    </div>
  )
}