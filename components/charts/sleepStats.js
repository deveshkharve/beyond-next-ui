import { XAxis, YAxis, BarChart, Bar, LabelList } from 'recharts';
import _ from "lodash";

const SleepStatusBarChart = ({data}) => {
  const toTime = (seconds) => {
    const totalMin = seconds / 60
    const hours = Math.round(totalMin/60)
    const minutes = Math.round(totalMin%60)
    return `${hours ? `${hours}hr` : ''} ${minutes ? `%{minutes}min`: ''}`
  }
	return (
      <div className="container">
       <BarChart width={300} height={300} data={data} layout="horizontal" >
          <Bar dataKey="sec" layout="horizontal" width={1} domain={['dataMin - 2', 'dataMax + 100']}>
          <LabelList dataKey="label" position="top" fontSize={12} stroke="#666" />
          </Bar>
          <XAxis dataKey="name" />
          <YAxis type="number" tickFormatter={toTime} hide />
        </BarChart>
    </div>
  )
}

const SleepHypnogramDataNotaAvailable = () => {
  return (
    <div>
      <h4>Hynogram data not available</h4>
    </div>
  )
}

export {
  SleepStatusBarChart, 
  SleepHypnogramDataNotaAvailable
}