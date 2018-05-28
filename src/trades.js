import './utils/jsdocsModels'

export class Trades {
/**
     * Get latest trades from all symbols up to 1 minute ago. Latest data is always returned in time descending order
     * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
     * @returns {Promise<Trade[]>}
     */
  latestDataAll (limit) {
    if (limit === void 0) {
      limit = null
    }
    let path = this.url + '/v1/trades/latest'
    let params = {}
    if (limit) {
      params.limit = limit
    }
    return axios
      .get(path, {
        headers: this.headers,
        transformResponse: transformResponse,
        params: params
      })
      .then(function (resp) {
        return resp.data
      })
  }

  /**
         * Get latest trades from a specific symbol without time limitation. Latest data is always returned in time descending order
         * @param  {String} symbolId Symbol identifier for requested timeseries (full list available [here]{@link CoinAPI#metadata_list_symbols})
         * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
         * @returns {Promise<Trade[]>}
         */
  latestDataSymbol (symbolId, limit) {
    if (limit === void 0) {
      limit = null
    }

    let path = this.url + ('/v1/trades/' + symbolId + '/latest')
    let params = {}

    if (limit) {
      params.limit = limit
    }

    return axios
      .get(path, {
        headers: this.headers,
        transformResponse: transformResponse,
        params: params
      })
      .then(function (resp) {
        return resp.data
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
  historicalData (symbolId, timeStart, timeEnd, limit) {
    if (timeEnd === void 0) {
      timeEnd = null
    }
    if (limit === void 0) {
      limit = null
    }
    let path = this.url + ('/v1/trades/' + symbolId + '/history?time_start=' + timeStart.toISOString())
    let params = {}
    if (timeEnd) {
      params.time = timeEnd.toISOString()
    }
    if (limit) {
      params.limit = limit
    }
    return axios
      .get(path, {
        headers: this.headers,
        transformResponse: transformResponse,
        params: params
      })
      .then(function (resp) {
        return resp.data
      })
  }
}

export default Trades
