import axios from "axios"
import { BEYOND_HOST } from "../configs"


export const fetchSleepDetails = async (userToken, startDate, endDate) => {
  const url = `${BEYOND_HOST}/external/activity-stats/sleep`
  let data
  if (startDate) {
    data = { startDate, endDate }
  }
  const results = await axios.post(url, data, {
    headers: {
      accesstoken: userToken
    }
  }).catch(error => {
    throw error
  })
  return results && results.data ? results.data : null
}