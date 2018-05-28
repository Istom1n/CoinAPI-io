import './utils/jsdocsModels'

export class Twitter {
/**
     * Get latest tweets related to cryptocurrency markets, returned in time descending order
     * @param  {Number} limit
     * @returns {Promise<Tweet[]>}
     */
    twitter_latest_data (limit) {
        if (limit === void 0) {
          limit = null
        }
        let path = this.url + '/v1/twitter/latest'
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
         * Get historical tweets related to cryptocurrency markets, returned in time ascending order
         * @param  {Date} time_start Starting time in ISO 8601
         * @param  {Date=} time_end Timeseries ending time in ISO 8601 (optional, if not supplied then the data is returned to the end or when result elements reaches count the limit)
         * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
         * @returns {Promise<Tweet[]>}
         */
      twitter_historical_data (time_start, time_end, limit) {
        if (time_end === void 0) {
          time_end = null
        }
    
        if (limit === void 0) {
          limit = null
        }
    
        let path = `${this
          .url}/v1/twitter/history?time_start=${time_start
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

export default Twitter