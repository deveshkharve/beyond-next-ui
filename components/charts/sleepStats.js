import { XAxis, YAxis, BarChart, Bar } from 'recharts';
import _ from "lodash";

export default function SleepStatusBarChart ({data}) {
  console.log('data>>>>', data)
  const toTime = (seconds) => {
    var date = new Date(null)
    date.setSeconds(seconds)
    return `${date.getHours()}hr ${date.getMinutes() ? `${date.getMinutes()}m`: ''}`
 }
	return (
      <div className="container">
       <BarChart width={400} height={400} data={data} layout="horizontal">
          <Bar dataKey="sec" layout="horizontal"/>
          <XAxis dataKey="name" />
          <YAxis tickFormatter={toTime}/>
        </BarChart>
    </div>
  )
}
