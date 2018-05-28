import './utils/jsdocsModels'

export class OHLCV {
/**
     * Get full list of supported time periods available for requesting OHLCV timeseries data.
     * @returns {Promise<Period[]>}
     */
    ohlcv_list_all_periods () {
        let path = this.url + '/v1/ohlcv/periods'
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
         * Get OHLCV latest timeseries data for requested symbol and period, returned in time descending order.
         * @param  {String} symbol_id Symbol identifier of requested timeseries (full list available here)
         * @param  {String} period_id Identifier of requested timeseries period (required, e.g. 5SEC or 2MTH, full list here)
         * @param  {Boolean=} include_empty_items Include items with no activity? (optional, default value is false, possible values are true or false)
         * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
         * @returns  {Promise<Candlestick[]>}
         */
      ohlcv_latest_data (symbol_id, period_id, include_empty_items, limit) {
        if (limit === void 0) {
          limit = null
        }
    
        let path = this.url + (`/v1/ohlcv/${symbol_id}/latest?period_id=${period_id}`)
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
         * Get OHLCV timeseries data for requested symbol and period, returned in time ascending order.
         * @param  {String} symbol_id Symbol identifier of requested timeseries (full list available here)
         * @param  {String} period_id Identifier of requested timeseries period (required, e.g. 5SEC or 2MTH, full list here)
         * @param  {Date} time_start Timeseries starting time in ISO 8601
         * @param  {Date=} time_end Timeseries ending time in ISO 8601 (optional, if not supplied then the data is returned to the end or when count of result elements reaches the limit)
         * @param  {Boolean=} include_empty_items Include items with no activity? (optional, default value is false, possible values are true or false)
         * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
         * @returns  {Promise<Candlestick[]>}
         */
      ohlcv_historic_data (symbol_id, period_id, time_start, time_end, include_empty_items, limit) {
        if (time_end === void 0) {
          time_end = null
        }
    
        if (limit === void 0) {
          limit = null
        }
    
        let path = `${this
          .url}/v1/ohlcv/${symbol_id}/history?period_id=${period_id}&time_start=${time_start
          .toISOString()}`
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

export default OHLCV