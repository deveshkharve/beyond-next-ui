import { Area, CartesianGrid, ComposedChart, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"

const SleepTrendChart = ({data, formatDate}) => {
  return (
    <LineChart width={300} height={300} data={data}>
      <Line type="monotone" dataKey="dailyScore" stroke="#8884d8" />
      <Tooltip />
      <CartesianGrid strokeDasharray="3 3" vertical={false}/>
      <XAxis dataKey="endTimeDate" tickFormatter={formatDate} fontSize="10"/>
      <YAxis domain={['dataMin - 2', 'dataMax + 2']} fontSize="10" />
    </LineChart>
  )
}

const SleepDurationSleepScoreTrend = ({data, formatDate}) => {
  return (
    <div>
      Sleep Duration vs sleep score
      <ComposedChart  width={300} height={300}  data={data} 
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey="endTimeDate" tickFormatter={formatDate} fontSize="10"/>
        <YAxis fontSize="10" label={false} domain={['dataMin - 5', 'dataMax + 5']} hide />
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
export {
  SleepTrendChart,
  SleepDurationSleepScoreTrend
}