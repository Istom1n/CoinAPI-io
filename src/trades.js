import './utils/jsdocsModels'

export class Trades {
/**
     * Get latest trades from all symbols up to 1 minute ago. Latest data is always returned in time descending order
     * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
     * @returns {Promise<Trade[]>}
     */
    trades_latest_data_all (limit) {
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
         * @param  {String} symbol_id Symbol identifier for requested timeseries (full list available [here]{@link CoinAPI#metadata_list_symbols})
         * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
         * @returns {Promise<Trade[]>}
         */
      trades_latest_data_symbol (symbol_id, limit) {
        if (limit === void 0) {
          limit = null
        }
    
        let path = this.url + ('/v1/trades/' + symbol_id + '/latest')
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
         * @param  {String} symbol_id Symbol identifier for requested timeseries (full list available [here]{@link CoinAPI#metadata_list_symbols})
         * @param  {Date} time_start Starting time in ISO 8601
         * @param  {Date=} time_end Timeseries ending time in ISO 8601 (optional, if not supplied then the data is returned to the end or when result elements count reaches the limit)
         * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
         * @returns {Promise<Trade[]>}
         */
      trades_historical_data (symbol_id, time_start, time_end, limit) {
        if (time_end === void 0) {
          time_end = null
        }
        if (limit === void 0) {
          limit = null
        }
        let path = this.url + ('/v1/trades/' + symbol_id + '/history?time_start=' + time_start.toISOString())
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

export default Trades