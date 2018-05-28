import request from './utils/request'
import { getEndpoint, requestProperties } from './api'
import './utils/jsdocsModels'

export class Trades {
  /**
  * Get latest trades from all symbols up to 1 minute ago. Latest data is always returned in time descending order
  * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
  * @param  {String=} filterSymbolId Comma or semicolon delimited parts of symbol identifier used to filter response. (optional, full list available [here]{@link CoinAPI#metadata_list_symbols})
  * @returns {Promise<Trade[]>}
  */
  async latestDataAll (limit, filterSymbolId) {
    return request({
      url: getEndpoint('/v1/trades/latest'),
      ...requestProperties(),
      qs: {
        filter_symbol_id: filterSymbolId,
        limit
      }
    })
  }

  /**
  * Get latest trades from a specific symbol without time limitation. Latest data is always returned in time descending order
  * @param  {String} symbolId Symbol identifier for requested timeseries (full list available [here]{@link CoinAPI#metadata_list_symbols})
  * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
  * @param  {String=} filterSymbolId Comma or semicolon delimited parts of symbol identifier used to filter response. (optional, full list available [here]{@link CoinAPI#metadata_list_symbols})
  * @returns {Promise<Trade[]>}
  */
  async latestDataSymbol (symbolId, limit, filterSymbolId) {
    return request({
      url: getEndpoint(`/v1/trades/${symbolId}/latest`),
      ...requestProperties(),
      qs: {
        filter_symbol_id: filterSymbolId,
        limit
      }
    })
  }

  /**
  * Get history transactions from specific symbol, returned in time ascending order.
  * @param  {String} symbolId Symbol identifier for requested timeseries (full list available [here]{@link CoinAPI#metadata_list_symbols})
  * @param  {Date} timeStart Starting time in ISO 8601
  * @param  {Date=} timeEnd Timeseries ending time in ISO 8601 (optional, if not supplied then the data is returned to the end or when result elements count reaches the limit)
  * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
  * @returns {Promise<Trade[]>}
  */
  async historicalData (symbolId, timeStart, timeEnd, limit) {
    return request({
      url: getEndpoint(`/v1/trades/${symbolId}/history`),
      ...requestProperties(),
      qs: {
        time_start: timeStart.toISOString(),
        time_end: timeEnd.toISOString(),
        limit
      }
    })
  }
}

export default Trades
