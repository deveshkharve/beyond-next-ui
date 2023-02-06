import { XAxis, YAxis, BarChart, Bar } from 'recharts';
import _ from "lodash";

export default function SleepStatusBarChart ({data}) {
  const toTime = (seconds) => {
    var date = new Date(null)
    date.setSeconds(seconds)
    return `${date.getHours()}hr ${date.getMinutes() ? `${date.getMinutes()}m`: ''}`
 }
	return (
      <div className="container">
       <BarChart width={300} height={300} data={data} layout="horizontal" >
          <Bar dataKey="sec" layout="horizontal" width={1} domain={['dataMin - 2', 'dataMax + 2']}/>
          <XAxis dataKey="name" />
          <YAxis tickFormatter={toTime}/>
        </BarChart>
    </div>
  )
}
