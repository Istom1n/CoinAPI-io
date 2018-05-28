import request from './utils/request'
import { getEndpoint, requestProperties } from './api'
import './utils/jsdocsModels'

export class Quotes {
  /**
  * Get current quotes for all symbols
  * @returns {Promise<Quotes>}
  */
  async currentDataAll () {
    return request({
      url: getEndpoint('/v1/quotes/current'),
      ...requestProperties()
    })
  }

  /**
  * Get current quotes for a specific symbol.
  * @param  {String} symbolId Symbol identifier of requested timeseries (full list available [here]{@link CoinAPI#metadata_list_symbols})
  * @returns {Promise<Quotes>}
  */
  async currentDataSymbol (symbolId) {
    return request({
      url: getEndpoint(`/v1/quotes/${symbolId}/current`),
      ...requestProperties()
    })
  }

  /**
  * Get latest quote updates up to 1 minute ago or get updates for a specific symbol without time limit. Latest data is always returned in time descending order.
  * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
  * @returns {Promise<Quote[]>}
  */
  async latestDataAll (limit) {
    return request({
      url: getEndpoint('/v1/quotes/latest'),
      ...requestProperties(),
      body: {
        limit
      }
    })
  }

  /**
  * Get latest quote updates up to 1 minute ago or get updates for a specific symbol without time limit. Latest data is always returned in time descending order.
  * @param  {String} symbolId Symbol identifier of requested timeseries (full list available [here]{@link CoinAPI#metadata_list_symbols})
  * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
  * @returns {Promise<Quote[]>}
  */
  async latestDataSymbol (symbolId, limit) {
    return request({
      url: getEndpoint(`/v1/quotes/${symbolId}/latest`),
      ...requestProperties(),
      body: {
        limit
      }
    })
  }

  /**
  * Get historical quote updates within requested time range, returned in time ascending order
  * @param  {String} symbolId Symbol identifier of requested timeseries (full list available [here]{@link CoinAPI#metadata_list_symbols})
  * @param  {Date} timeStart Starting time in ISO 8601
  * @param  {Date=} timeEnd Timeseries ending time in ISO 8601 (optional, if not supplied then the data is returned to the end or when result elements count reaches the limit)
  * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
  * @returns {Promise<Quote[]>}
  */
  async historicalData (symbolId, timeStart, timeEnd, limit) {
    return request({
      url: getEndpoint(`/v1/quotes/${symbolId}/history`),
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

export default Quotes
