import './utils/jsdocsModels'

export class OrderBook {
/**
     * Get current order book snapshot for all symbols
     * @returns {Promise<OrderBook>}
     */
    orderbooks_current_data_all () {
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
         * @param  {String} symbol_id Symbol identifier for requested timeseries (full list available [here]{@link CoinAPI#metadata_list_symbols})
         * @param  {Number=} limit_levels Maximum amount of levels from each side of the book to include in response (optional)
         * @returns {Promise<OrderBook>}
         */
      orderbooks_current_data_symbol (symbol_id, limit_levels) {
        let path = this.url + ('/v1/orderbooks/' + symbol_id + '/current')
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
         * @param  {String} symbol_id Symbol identifier for requested timeseries (full list available [here]{@link CoinAPI#metadata_list_symbols})
         * @param  {Number=} limit_levels Maximum amount of levels from each side of the book to include in response (optional)
         * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
         * @returns {Promise<OrderBook>}
         */
      orderbooks_latest_data (symbol_id, limit_levels, limit) {
        if (limit === void 0) {
          limit = null
        }
        let path = this.url + ('/v1/orderbooks/' + symbol_id + '/latest')
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
         * @param  {String} symbol_id Symbol identifier for requested timeseries (full list available [here]{@link CoinAPI#metadata_list_symbols})
         * @param  {Date} time_start Starting time in ISO 8601
         * @param  {Date=} time_end Timeseries ending time in ISO 8601 (optional, if not supplied then the data is returned to the end or when result elements count reaches the limit)
         * @param  {Number=} limit_levels Maximum amount of levels from each side of the book to include in response (optional)
         * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
         */
      orderbooks_historical_data (symbol_id, time_start, time_end, limit_levels, limit) {
        if (time_end === void 0) {
          time_end = null
        }
        if (limit === void 0) {
          limit = null
        }
        let path = this.url + ('/v1/orderbooks/' + symbol_id + '/history?time_start=' + time_start.toISOString())
        let params = {}
        if (time_end) {
          params.time = time_end.toISOString()
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