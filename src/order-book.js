import request from './utils/request'
import { getEndpoint, requestProperties } from './api'
import './utils/jsdocsModels'

export class OrderBook {
  /**
  * Get current order book snapshot for all symbols
  * @returns {Promise<OrderBook>}
  */
  async currentDataAll () {
    return request({
      url: getEndpoint('/v1/orderbooks/current'),
      ...requestProperties()
    })
  }

  /**
  * Get current order book snapshot for a specific symbol
  * @param  {String} symbolId Symbol identifier for requested timeseries (full list available [here]{@link CoinAPI#metadata_list_symbols})
  * @param  {Number=} limitLevels Maximum amount of levels from each side of the book to include in response (optional)
  * @returns {Promise<OrderBook>}
  */

  async currentDataSymbol (symbolId, limitLevels) {
    // TODO Add new limitLevels param
    return request({
      url: getEndpoint(`/v1/orderbooks/${symbolId}/current`),
      ...requestProperties()
    })
  }

  /**
  * Get latest order book snapshots for a specific symbol, returned in time descending order
  * @param  {String} symbolId Symbol identifier for requested timeseries (full list available [here]{@link CoinAPI#metadata_list_symbols})
  * @param  {Number=} limitLevels Maximum amount of levels from each side of the book to include in response (optional)
  * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
  * @returns {Promise<OrderBook>}
  */
  async latestData (symbolId, limitLevels, limit) {
    // TODO Add new limitLevels param
    return request({
      url: getEndpoint(`/v1/orderbooks/${symbolId}/latest`),
      ...requestProperties(),
      body: {
        limit
      }
    })
  }

  /**
  * Get historical order book snapshots for a specific symbol within time range, returned in time ascending order
  * @param  {String} symbolId Symbol identifier for requested timeseries (full list available [here]{@link CoinAPI#metadata_list_symbols})
  * @param  {Date} timeStart Starting time in ISO 8601
  * @param  {Date=} timeEnd Timeseries ending time in ISO 8601 (optional, if not supplied then the data is returned to the end or when result elements count reaches the limit)
  * @param  {Number=} limitLevels Maximum amount of levels from each side of the book to include in response (optional)
  * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
  * @returns {Promise<OrderBook>}
  */
  async historicalData (symbolId, timeStart, timeEnd, limitLevels, limit) {
    // TODO Add new limitLevels param
    return request({
      url: getEndpoint(`/v1/orderbooks/${symbolId}/history`),
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

export default OrderBook
