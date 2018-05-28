import './utils/jsdocsModels'

export class OrderBook {
/**
     * Get current order book snapshot for all symbols
     * @returns {Promise<OrderBook>}
     */
  currentDataAll () {
    let path = this.url + '/v1/orderbooks/current'
    let params = {}
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
         * Get current order book snapshot for a specific symbol
         * @param  {String} symbolId Symbol identifier for requested timeseries (full list available [here]{@link CoinAPI#metadata_list_symbols})
         * @param  {Number=} limitLevels Maximum amount of levels from each side of the book to include in response (optional)
         * @returns {Promise<OrderBook>}
         */
  currentDataSymbol (symbolId, limitLevels) {
    let path = this.url + ('/v1/orderbooks/' + symbolId + '/current')
    return axios
      .get(path, {
        headers: this.headers,
        transformResponse: transformResponse
      })
      .then(function (resp) {
        return resp.data
      })
  }

  /**
         * Get latest order book snapshots for a specific symbol, returned in time descending order
         * @param  {String} symbolId Symbol identifier for requested timeseries (full list available [here]{@link CoinAPI#metadata_list_symbols})
         * @param  {Number=} limitLevels Maximum amount of levels from each side of the book to include in response (optional)
         * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
         * @returns {Promise<OrderBook>}
         */
  latestData (symbolId, limitLevels, limit) {
    if (limit === void 0) {
      limit = null
    }
    let path = this.url + ('/v1/orderbooks/' + symbolId + '/latest')
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
         * Get historical order book snapshots for a specific symbol within time range, returned in time ascending order
         * @param  {String} symbolId Symbol identifier for requested timeseries (full list available [here]{@link CoinAPI#metadata_list_symbols})
         * @param  {Date} timeStart Starting time in ISO 8601
         * @param  {Date=} timeEnd Timeseries ending time in ISO 8601 (optional, if not supplied then the data is returned to the end or when result elements count reaches the limit)
         * @param  {Number=} limitLevels Maximum amount of levels from each side of the book to include in response (optional)
         * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
         */
  historicalData (symbolId, timeStart, timeEnd, limitLevels, limit) {
    if (timeEnd === void 0) {
      timeEnd = null
    }
    if (limit === void 0) {
      limit = null
    }
    let path = this.url + ('/v1/orderbooks/' + symbolId + '/history?time_start=' + timeStart.toISOString())
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

export default OrderBook
