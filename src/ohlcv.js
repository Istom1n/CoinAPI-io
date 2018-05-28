import './utils/jsdocsModels'

export class OHLCV {
/**
     * Get full list of supported time periods available for requesting OHLCV timeseries data.
     * @returns {Promise<Period[]>}
     */
  listAllPeriods () {
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
         * @param  {String} symbolId Symbol identifier of requested timeseries (full list available here)
         * @param  {String} periodId Identifier of requested timeseries period (required, e.g. 5SEC or 2MTH, full list here)
         * @param  {Boolean=} includeEmptyItems Include items with no activity? (optional, default value is false, possible values are true or false)
         * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
         * @returns  {Promise<Candlestick[]>}
         */
  latestData (symbolId, periodId, includeEmptyItems, limit) {
    if (limit === void 0) {
      limit = null
    }

    let path = this.url + (`/v1/ohlcv/${symbolId}/latest?period_id=${periodId}`)
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
         * @param  {String} symbolId Symbol identifier of requested timeseries (full list available here)
         * @param  {String} periodId Identifier of requested timeseries period (required, e.g. 5SEC or 2MTH, full list here)
         * @param  {Date} timeStart Timeseries starting time in ISO 8601
         * @param  {Date=} timeEnd Timeseries ending time in ISO 8601 (optional, if not supplied then the data is returned to the end or when count of result elements reaches the limit)
         * @param  {Boolean=} includeEmptyItems Include items with no activity? (optional, default value is false, possible values are true or false)
         * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
         * @returns  {Promise<Candlestick[]>}
         */
  historicData (symbolId, periodId, timeStart, timeEnd, includeEmptyItems, limit) {
    if (timeEnd === void 0) {
      timeEnd = null
    }

    if (limit === void 0) {
      limit = null
    }

    let path = `${this
      .url}/v1/ohlcv/${symbolId}/history?period_id=${periodId}&time_start=${timeStart
      .toISOString()}`
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

export default OHLCV
