import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const HeartRateChart = ({data, formatTime}) => {
  return (
    <div>
      <h4>Heart Rate</h4>
      <LineChart width={300} height={300} data={data}>
        <Line type="monotone" dataKey="bpm" stroke="#73A9AD" dot={false} strokeWidth="3" fill="#898AA6"/>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Tooltip />
        <XAxis dataKey="time" tickFormatter={formatTime} fontSize="10" tickCount={4}/>
        <YAxis dataKey="bpm" domain={['dataMin - 2', 'dataMax + 2']} fontSize="10" tickCount={5}/>
      </LineChart>
    </div>
  )
}

const HeartRateChartNotAvailable = () => {
  return (
    <div>
      <h4>Hypnogram Data not available</h4>
    </div>
  )
}

export {
  HeartRateChart,
  HeartRateChartNotAvailable
}
