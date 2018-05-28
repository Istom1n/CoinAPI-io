import request from './utils/request'
import { getEndpoint, requestProperties } from './api'
import './utils/jsdocsModels'

export class Twitter {
  /**
  * Get latest tweets related to cryptocurrency markets, returned in time descending order
  * @param  {Number} limit
  * @returns {Promise<Tweet[]>}
  */
  async latestData (limit) {
    return request({
      url: getEndpoint('/v1/twitter/latest'),
      ...requestProperties(),
      body: {
        limit
      }
    })
  }

  /**
  * Get historical tweets related to cryptocurrency markets, returned in time ascending order
  * @param  {Date} timeStart Starting time in ISO 8601
  * @param  {Date=} timeEnd Timeseries ending time in ISO 8601 (optional, if not supplied then the data is returned to the end or when result elements reaches count the limit)
  * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
  * @returns {Promise<Tweet[]>}
  */
  async historicalData (timeStart, timeEnd, limit) {
    return request({
      url: getEndpoint(`/v1/twitter/history`),
      ...requestProperties(),
      qs: {
        time_start: timeStart.toISOString()
      },
      body: {
        time: timeEnd.toISOString(),
        limit
      }
    })
  }
}

export default Twitter
